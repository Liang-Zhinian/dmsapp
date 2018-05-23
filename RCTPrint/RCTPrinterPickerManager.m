//
//  RCTPrinterPickerManager.m
//  dove
//
//  Created by Sprite on 2018/5/23.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RCTPrinterPickerManager.h"
#import "RCTPrinterPickerView.h"

#import <QuickLook/QuickLook.h>

@implementation RCTPrinterPickerManager

RCT_EXPORT_MODULE()

- (UIView *) view  {
  return [[RCTPrinterPickerView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(printerUrl, NSString)


@end
