//
//  UIPrintPageRenderer+PDF.m
//  dove
//
//  Created by Sprite on 2018/5/25.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "UIPrintPageRenderer+PDF.h"

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
