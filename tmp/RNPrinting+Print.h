//
//  RNPrinting+Print.h
//  dove
//
//  Created by Sprite on 2018/5/25.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RNPrinting.h"
#import "DoveWebView.h"

typedef void (^PrintingCompletionHandler)(UIPrintInfo * _Nullable printInfo, BOOL completed, NSError * _Nullable error);

@interface RNPrinting (Print)

@property UIPrinter *pickedPrinter;
@property NSString *filePath;
@property NSString *htmlString;
@property NSURL *printerURL;
@property NSInteger copies;
@property (nonatomic, assign) BOOL isLandscape;

-(void)printToPrinter:(NSData*_Nullable)printData completionHandler:(nullable PrintingCompletionHandler)completion;
-(NSData*_Nullable)createPDF:(DoveWebView* _Nullable)myWebView;
@end
