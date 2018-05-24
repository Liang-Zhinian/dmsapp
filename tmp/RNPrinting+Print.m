//
//  RNPrinting+Print.m
//  dove
//
//  Created by Sprite on 2018/5/25.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RNPrinting+Print.h"
#import "UIPrintPageRenderer+PDF.h"

@implementation RNPrinting (Print)

#define PDFSize CGSizeMake(595.2,841.8)

-(NSData*)createPDF:(DoveWebView*)myWebView {
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

@end
