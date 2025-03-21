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

import com.sky.test.kabeja.dxf.DXFCircle;
import com.sky.test.kabeja.dxf.DXFEntity;
import com.sky.test.kabeja.dxf.helpers.Point;
import com.sky.test.kabeja.math.ParametricPlane;
import com.sky.test.kabeja.math.TransformContext;
import com.sky.test.kabeja.svg.SVGConstants;
import com.sky.test.kabeja.svg.SVGUtils;
import org.xml.sax.ContentHandler;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.AttributesImpl;


public class SVGCircleGenerator extends AbstractSVGSAXGenerator {
    public void toSAX(ContentHandler handler, Map svgContext, DXFEntity entity,
        TransformContext transformContext) throws SAXException {
        DXFCircle circle = (DXFCircle) entity;
        AttributesImpl attr = new AttributesImpl();
        ParametricPlane plane = new ParametricPlane(circle.getExtrusion());
        Point center = circle.getCenterPoint();

        Point p = plane.getPoint(center.getX(), center.getY());

        SVGUtils.addAttribute(attr, "cx",
            SVGUtils.formatNumberAttribute(p.getX()));
        SVGUtils.addAttribute(attr, "cy",
            SVGUtils.formatNumberAttribute(p.getY()));
        SVGUtils.addAttribute(attr, "r",
            SVGUtils.formatNumberAttribute(circle.getRadius()));

        super.setCommonAttributes(attr, svgContext, circle);

        SVGUtils.emptyElement(handler, SVGConstants.SVG_CIRCLE, attr);
    }
}
