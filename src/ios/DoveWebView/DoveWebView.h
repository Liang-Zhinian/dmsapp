//
//  DoveWebView.h
//  dove
//
//  Created by Sprite on 2018/5/25.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#ifndef DoveWebView_h
#define DoveWebView_h


#import <UIKit/UIKit.h>


typedef void(^WebViewFinishLoadBlock)(UIWebView *, NSError *);

@interface DoveWebView : UIWebView

@property(nonatomic, copy) WebViewFinishLoadBlock webViewFinishLoadBlock;

- (void)loadRequest:(NSURLRequest *)request withCompletionHandler:(WebViewFinishLoadBlock)completionHandler;

@end



#endif /* DoveWebView_h */
