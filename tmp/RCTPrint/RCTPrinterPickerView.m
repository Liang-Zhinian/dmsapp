//
//  RCTPrinterPickerView.m
//  dove
//
//  Created by Sprite on 2018/5/23.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RCTPrinterPickerView.h"


@interface RCTPrinterPickerView () <UIPrintInteractionControllerDelegate, UIPrinterPickerControllerDelegate>
@property UIPrinter *pickedPrinter;
@property NSURL *printerURL;
@property UIView* printerPickerView;
@property UIPrinterPickerController *printerPickerCtrl;

@end

@implementation RCTPrinterPickerView

- (instancetype)init {
  self = [super init];
  if (self) {
    [self initialize];
  }
  return self;
  
}

- (void)initialize {
  
  self.printerPickerCtrl = [[UIPrinterPickerController alloc] init];
  self.printerPickerCtrl.delegate = self;
//  self.printerPickerCtrl.dataSource = self;
  self.printerPickerView = self.printerPickerCtrl.view;
  self.clipsToBounds = YES;
  [self addSubview:self.printerPickerCtrl.view];
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


#pragma mark - UIPrinterPickerControllerDelegate

// Asks the delegate if the specified printer should be included in the picker.
- (BOOL)printerPickerController:(UIPrinterPickerController *)printerPickerController
              shouldShowPrinter:(UIPrinter *)printer{
  return true;
}

// Handling the Printer Selection
// Tells the delegate that a printer was selected.
- (void)printerPickerControllerDidSelectPrinter:(UIPrinterPickerController *)printerPickerController{}

// Responding to Printer Picker Events

// Asks the delegate to provide the view controller to act as the parent of the printer picker.
//- (UIViewController *)printerPickerControllerParentViewController:(UIPrinterPickerController *)printerPickerController {
//  return self;
//}

// Tells the delegate that the printer picker is about to be displayed.
- (void)printerPickerControllerWillPresent:(UIPrinterPickerController *)printerPickerController{}

// Tells the delegate that the printer picker was displayed and is now visible.
- (void)printerPickerControllerDidPresent:(UIPrinterPickerController *)printerPickerController{}

// Tells the delegate that the printer picker is about to be dismissed.
- (void)printerPickerControllerWillDismiss:(UIPrinterPickerController *)printerPickerController{}

// Tells the delegate that the printer picker was dismissed.
- (void)printerPickerControllerDidDismiss:(UIPrinterPickerController *)printerPickerController{}


@end
