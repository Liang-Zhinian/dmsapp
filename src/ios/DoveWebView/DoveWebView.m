//
//  DoveWebView.m
//  dove
//
//  Created by Sprite on 2018/5/25.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "DoveWebView.h"

@interface DoveWebView () <UIWebViewDelegate>
@end

@implementation DoveWebView

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
