//
//  RCTPrint.h
//  dove
//
//  Created by Sprite on 2018/5/23.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTView.h>
#import <React/RCTBridgeModule.h>

@interface RCTPrint : RCTView <RCTBridgeModule, UIPrintInteractionControllerDelegate, UIPrinterPickerControllerDelegate>
@property UIPrinter *pickedPrinter;
@property NSString *filePath;
@property NSString *htmlString;
@property NSURL *printerURL;
@property (nonatomic, assign) BOOL isLandscape;
@end
