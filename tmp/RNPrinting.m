//
//  RCTPrint.m
//  dove
//
//  Created by Sprite on 2018/5/23.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RNPrinting.h"
#import <React/RCTConvert.h>
#import <React/RCTUtils.h>

typedef void (^PrintingCompletionHandler)(UIPrintInfo *printInfo, BOOL completed, NSError *error);

typedef void(^WebViewFinishLoadBlock)(UIWebView *, NSError *);

@interface MyWebView : UIWebView

@property(nonatomic, copy) WebViewFinishLoadBlock webViewFinishLoadBlock;

- (void)loadRequest:(NSURLRequest *)request withCompletionHandler:(WebViewFinishLoadBlock)completionHandler;

@end

@interface MyWebView () <UIWebViewDelegate>
@end

@implementation MyWebView

- (void)loadRequest:(NSURLRequest *)request withCompletionHandler:(WebViewFinishLoadBlock)completionHandler
{
  self.delegate = self;
  self.webViewFinishLoadBlock = completionHandler;
  
  [self loadRequest:request];
}

#pragma mark - UIWebViewDelegate

- (void)webViewDidFinishLoad:(UIWebView *)webView
{
  if (self.webViewFinishLoadBlock) {
    self.webViewFinishLoadBlock(webView, nil);
    self.webViewFinishLoadBlock = nil;
  }
}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error
{
  if (self.webViewFinishLoadBlock) {
    self.webViewFinishLoadBlock(webView, error);
    self.webViewFinishLoadBlock = nil;
  }
}

@end

@interface UIPrintPageRenderer (PDF)
- (NSData*) createPDF;
@end

@implementation UIPrintPageRenderer (PDF)
- (NSData*) createPDF
{
  NSMutableData *pdfData = [NSMutableData data];
  UIGraphicsBeginPDFContextToData( pdfData, self.paperRect, nil );
  [self prepareForDrawingPages: NSMakeRange(0, self.numberOfPages)];
  CGRect bounds = UIGraphicsGetPDFContextBounds();
  for ( int i = 0 ; i < self.numberOfPages ; i++ )
  {
    UIGraphicsBeginPDFPage();
    [self drawPageAtIndex: i inRect: bounds];
  }
  UIGraphicsEndPDFContext();
  return pdfData;
}
@end

@implementation RNPrinting

#define PDFSize CGSizeMake(595.2,841.8)

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE(RNPrinting);

RCT_EXPORT_METHOD(print:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  
  if (options[@"filePath"]){
    _filePath = [RCTConvert NSString:options[@"filePath"]];
  }
  
  if (options[@"html"]){
    _htmlString = [RCTConvert NSString:options[@"html"]];
  }
  
  if (options[@"printerURL"]){
    _printerURL = [NSURL URLWithString:[RCTConvert NSString:options[@"printerURL"]]];
    _pickedPrinter = [UIPrinter printerWithURL:_printerURL];
  }
  
  if(options[@"isLandscape"]) {
    _isLandscape = [[RCTConvert NSNumber:options[@"isLandscape"]] boolValue];
  }
  
  if (options[@"copies"]){
    _copies = [RCTConvert NSInteger:options[@"copies"]];
  }
  
  if ((_filePath && _htmlString) || (_filePath == nil && _htmlString == nil)) {
    reject(RCTErrorUnspecified, nil, RCTErrorWithMessage(@"Must provide either `html` or `filePath`. Both are either missing or passed together"));
  }
  
  NSData *printData;
  BOOL isValidURL = NO;
  NSURL *candidateURL = [NSURL URLWithString: _filePath];
  if (candidateURL && candidateURL.scheme && candidateURL.host)
    isValidURL = YES;
  
  if (isValidURL) {
    // TODO: This needs updated to use NSURLSession dataTaskWithURL:completionHandler:
    printData = [NSData dataWithContentsOfURL:candidateURL];
  } else {
    printData = [NSData dataWithContentsOfFile: _filePath];
  }
  
  
      if([UIPrintInteractionController canPrintData:printData]){
          
          // Completion handler
          void (^completionHandler)(UIPrintInfo *, BOOL, NSError *) =
          ^(UIPrintInfo *printInfo, BOOL completed, NSError *error) {
            if (!completed && error) {
              NSLog(@"Printing could not complete because of error: %@", error);
              reject(RCTErrorUnspecified, nil, RCTErrorWithMessage(error.description));
            } else {
              resolve(completed ? printInfo.jobName : nil);
            }
          };
          
          [self printToPrinter:printData completionHandler:completionHandler];
        return;
      }
  
        CGRect rect = [[UIScreen mainScreen] bounds];
        CGSize screenSize = rect.size;
  
        MyWebView *myWebView = [[MyWebView alloc] initWithFrame:CGRectMake(0,0,screenSize.width,screenSize.height)];
  
        NSURL *myUrl = [NSURL URLWithString:_filePath];
        NSURLRequest *myRequest = [NSURLRequest requestWithURL:myUrl];
  
        void (^requestCompletionHandler)(UIWebView *, NSError *) =
        ^(UIWebView *webView, NSError *error) {
  
  
          // Call the printToPDF helper method that will do the actual PDF creation using values set above
          printData = [self createPDF:myWebView];
  
          if(!_htmlString && ![UIPrintInteractionController canPrintData:printData]) {
            reject(RCTErrorUnspecified, nil, RCTErrorWithMessage(@"Unable to print this filePath"));
            return;
          }
  
  
        };
  
        [myWebView loadRequest:myRequest withCompletionHandler:requestCompletionHandler];
  
        myWebView.autoresizesSubviews = YES;
        myWebView.autoresizingMask=(UIViewAutoresizingFlexibleHeight | UIViewAutoresizingFlexibleWidth);
      
}


RCT_EXPORT_METHOD(selectPrinter:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  
  UIPrinterPickerController *printPicker = [UIPrinterPickerController printerPickerControllerWithInitiallySelectedPrinter: _pickedPrinter];
  
  printPicker.delegate = self;
  
  void (^completionHandler)(UIPrinterPickerController *, BOOL, NSError *) =
  ^(UIPrinterPickerController *printerPicker, BOOL userDidSelect, NSError *error) {
    if (!userDidSelect && error) {
      NSLog(@"Printing could not complete because of error: %@", error);
      reject(RCTErrorUnspecified, nil, RCTErrorWithMessage(error.description));
    } else {
      [UIPrinterPickerController printerPickerControllerWithInitiallySelectedPrinter:printerPicker.selectedPrinter];
      if (userDidSelect) {
        _pickedPrinter = printerPicker.selectedPrinter;
        NSDictionary *printerDetails = @{
                                         @"name" : _pickedPrinter.displayName,
                                         @"url" : _pickedPrinter.URL.absoluteString,
                                         };
        resolve(printerDetails);
      }
    }
  };
  
  if([UIDevice currentDevice].userInterfaceIdiom == UIUserInterfaceIdiomPad) { // iPad
    UIView *view = [[UIApplication sharedApplication] keyWindow].rootViewController.view;
    [printPicker presentFromRect:view.frame inView:view animated:YES completionHandler:completionHandler];
  } else { // iPhone
    [printPicker presentAnimated:YES completionHandler:completionHandler];
  }
}


RCT_EXPORT_METHOD(selectPrinterWithUrl:(NSDictionary *)options
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
  
  if (options[@"printerURL"]){
    _printerURL = [NSURL URLWithString:[RCTConvert NSString:options[@"printerURL"]]];
    _pickedPrinter = [UIPrinter printerWithURL:_printerURL];
  }
  
  void (^completionHandler)(BOOL) =
  ^(BOOL available) {
    // available: YES if the printer was available and its information was retrieved or NO if the printer could not be found or was unavailable.
    if (available) {
    NSDictionary *printerDetails = @{
                                     @"name" : _pickedPrinter.displayName,
                                     @"url" : _pickedPrinter.URL.absoluteString,
                                     };
    resolve(printerDetails);
    } else {
      reject(RCTErrorUnspecified, nil, RCTErrorWithMessage(@"The printer could not be found or was unavailable."));
      return;
    }
  };
  
  if(!_pickedPrinter) {
    reject(RCTErrorUnspecified, nil, RCTErrorWithMessage(@"The printer could not be found or was unavailable."));
    return;
  }
  
  [_pickedPrinter contactPrinter:completionHandler];
  
}

-(NSData*)createPDF:(MyWebView*)myWebView {
  if (myWebView.isLoading) return nil;
  
  UIPrintPageRenderer *render = [[UIPrintPageRenderer alloc] init];
  [render addPrintFormatter:myWebView.viewPrintFormatter startingAtPageAtIndex:0];
  
  // Padding is desirable, but optional
  float padding = 10.0f;
  
  // Define the printableRect and paperRect
  // If the printableRect defines the printable area of the page
  CGRect paperRect = CGRectMake(0, 0, PDFSize.width, PDFSize.height);
  CGRect printableRect = CGRectMake(padding, padding, PDFSize.width-(padding * 2), PDFSize.height-(padding * 2));
  
  [render setValue:[NSValue valueWithCGRect:paperRect] forKey:@"paperRect"];
  [render setValue:[NSValue valueWithCGRect:printableRect] forKey:@"printableRect"];
  
  // Call the printToPDF helper method that will do the actual PDF creation using values set above
  NSData *pdfData = [render createPDF];
  return pdfData;
}


-(void)printToPrinter:(NSData*)printData completionHandler:(nullable PrintingCompletionHandler)completion{
  
  UIPrintInteractionController *printInteractionController = [UIPrintInteractionController sharedPrintController];
  printInteractionController.delegate = self;
  
  // Create printing info
  UIPrintInfo *printInfo = [UIPrintInfo printInfo];
  
  printInfo.outputType = UIPrintInfoOutputGeneral;
  printInfo.jobName = [_filePath lastPathComponent];
  printInfo.duplex = UIPrintInfoDuplexLongEdge;
  printInfo.orientation = _isLandscape? UIPrintInfoOrientationLandscape: UIPrintInfoOrientationPortrait;
  printInteractionController.showsNumberOfCopies=YES;
  printInteractionController.printInfo = printInfo;
  printInteractionController.showsPageRange = YES;
  
  if (_htmlString) {
    UIMarkupTextPrintFormatter *formatter = [[UIMarkupTextPrintFormatter alloc] initWithMarkupText:_htmlString];
    printInteractionController.printFormatter = formatter;
  } else {
    printInteractionController.printingItem = printData;
  }
  
  // Completion handler
  void (^completionHandler)(UIPrintInteractionController *, BOOL, NSError *) =
  ^(UIPrintInteractionController *printController, BOOL completed, NSError *error) {
    completion(printInfo, completed, error);
  };
  
  if (_pickedPrinter) {
    [printInteractionController printToPrinter:_pickedPrinter completionHandler:completionHandler];
  } else if([UIDevice currentDevice].userInterfaceIdiom == UIUserInterfaceIdiomPad) { // iPad
    UIView *view = [[UIApplication sharedApplication] keyWindow].rootViewController.view;
    [printInteractionController presentFromRect:view.frame inView:view animated:YES completionHandler:completionHandler];
  } else { // iPhone
    [printInteractionController presentAnimated:YES completionHandler:completionHandler];
  }
}

#pragma mark - UIPrintInteractionControllerDelegate

-(UIViewController*)printInteractionControllerParentViewController:(UIPrintInteractionController*)printInteractionController  {
  UIViewController *result = [[[[UIApplication sharedApplication] delegate] window] rootViewController];
  while (result.presentedViewController) {
    result = result.presentedViewController;
  }
  return result;
}

-(void)printInteractionControllerWillDismissPrinterOptions:(UIPrintInteractionController*)printInteractionController {}

-(void)printInteractionControllerDidDismissPrinterOptions:(UIPrintInteractionController*)printInteractionController {}

-(void)printInteractionControllerWillPresentPrinterOptions:(UIPrintInteractionController*)printInteractionController {}

-(void)printInteractionControllerDidPresentPrinterOptions:(UIPrintInteractionController*)printInteractionController {}

-(void)printInteractionControllerWillStartJob:(UIPrintInteractionController*)printInteractionController {}

-(void)printInteractionControllerDidFinishJob:(UIPrintInteractionController*)printInteractionController {}

@end
