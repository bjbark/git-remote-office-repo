/*
   Copyright 2008 Simon Mieth

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
package com.sky.test.kabeja.svg.generators;

import java.util.Map;

import com.sky.test.kabeja.dxf.DXFBlock;
import com.sky.test.kabeja.dxf.DXFDimension;
import com.sky.test.kabeja.dxf.DXFEntity;
import com.sky.test.kabeja.dxf.helpers.Point;
import com.sky.test.kabeja.math.TransformContext;
import com.sky.test.kabeja.svg.SVGConstants;
import com.sky.test.kabeja.svg.SVGContext;
import com.sky.test.kabeja.svg.SVGUtils;
import org.xml.sax.ContentHandler;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.AttributesImpl;


public class SVGDimensionGenerator extends AbstractSVGSAXGenerator {
    public void toSAX(ContentHandler handler, Map svgContext, DXFEntity entity,
        TransformContext transformContext) throws SAXException {
        DXFDimension dimension = (DXFDimension) entity;

        if (dimension.getDXFDocument().getDXFBlock(dimension.getDimensionBlock()) != null) {
            DXFBlock block = dimension.getDXFDocument()
                                      .getDXFBlock(dimension.getDimensionBlock());
            AttributesImpl attr = new AttributesImpl();
            StringBuilder buf = new StringBuilder();

            buf.append("translate(");
            buf.append((dimension.getInsertPoint().getX()));
            buf.append(SVGConstants.SVG_ATTRIBUTE_PATH_PLACEHOLDER);
            buf.append((dimension.getInsertPoint().getY()));
            buf.append(")");

            Point referencePoint = block.getReferencePoint();

            if ((referencePoint.getX() != 0.0) ||
                    (referencePoint.getY() != 0.0)) {
                buf.append(" translate(");
                buf.append(SVGUtils.formatNumberAttribute(referencePoint.getX()));
                buf.append(SVGConstants.SVG_ATTRIBUTE_PATH_PLACEHOLDER);
                buf.append(SVGUtils.formatNumberAttribute(referencePoint.getY()));
                buf.append(")");
            }

            SVGUtils.addAttribute(attr, "transform", buf.toString());

            super.setCommonAttributes(attr, svgContext, dimension);

   
            if (svgContext.containsKey(SVGContext.LAYER_STROKE_WIDTH)) {
                Double lw = (Double) svgContext.get(SVGContext.LAYER_STROKE_WIDTH);
                String value = SVGUtils.formatNumberAttribute(lw.doubleValue());
                int index = attr.getIndex(SVGConstants.SVG_ATTRIBUTE_STROKE_WITDH);
                if (index == -1) {
                    SVGUtils.addAttribute(attr,
                            SVGConstants.SVG_ATTRIBUTE_STROKE_WITDH, value);
                } else {
                    attr.setValue(index, value);
                }
            }
            
            SVGUtils.startElement(handler, SVGConstants.SVG_GROUP, attr);
            attr = new AttributesImpl();

            attr.addAttribute(SVGConstants.XMLNS_NAMESPACE, "xlink",
                SVGConstants.XMLNS_XLINK, SVGUtils.DEFAUL_ATTRIBUTE_TYPE, SVGConstants.XLINK_NAMESPACE);
            attr.addAttribute(SVGConstants.XLINK_NAMESPACE, "href",
                SVGConstants.XLINK_HREF, SVGUtils.DEFAUL_ATTRIBUTE_TYPE,
                "#" + SVGUtils.validateID(dimension.getDimensionBlock()));

            SVGUtils.emptyElement(handler, SVGConstants.SVG_USE, attr);

            SVGUtils.endElement(handler, SVGConstants.SVG_GROUP);
        }

        // else if (dimType == TYPE_LINEAR || dimType == 32 || dimType == 160) {
        // LinearDimensionOutputter out = new LinearDimensionOutputter(
        // this);
        // out.output(handler);
        // }
    }
}
