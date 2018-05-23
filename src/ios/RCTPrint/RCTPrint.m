//
//  RCTPrint.m
//  dove
//
//  Created by Sprite on 2018/5/23.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RCTPrint.h"
#import <React/RCTConvert.h>
#import <React/RCTUtils.h>

@implementation RCTPrint

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE();

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
  
  if(!_htmlString && ![UIPrintInteractionController canPrintData:printData]) {
    reject(RCTErrorUnspecified, nil, RCTErrorWithMessage(@"Unable to print this filePath"));
    return;
  }
  
  UIPrintInteractionController *printInteractionController = [UIPrintInteractionController sharedPrintController];
  printInteractionController.delegate = self;
  
  // Create printing info
  UIPrintInfo *printInfo = [UIPrintInfo printInfo];
  
  printInfo.outputType = UIPrintInfoOutputGeneral;
  printInfo.jobName = [_filePath lastPathComponent];
  printInfo.duplex = UIPrintInfoDuplexLongEdge;
  printInfo.orientation = _isLandscape? UIPrintInfoOrientationLandscape: UIPrintInfoOrientationPortrait;
  
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
    if (!completed && error) {
      NSLog(@"Printing could not complete because of error: %@", error);
      reject(RCTErrorUnspecified, nil, RCTErrorWithMessage(error.description));
    } else {
      resolve(completed ? printInfo.jobName : nil);
    }
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
