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

import com.sky.test.kabeja.dxf.DXFConstants;
import com.sky.test.kabeja.dxf.DXFDimensionStyle;
import com.sky.test.kabeja.dxf.DXFEntity;
import com.sky.test.kabeja.dxf.DXFTolerance;
import com.sky.test.kabeja.math.MathUtils;
import com.sky.test.kabeja.math.TransformContext;
import org.xml.sax.ContentHandler;
import org.xml.sax.SAXException;


public class SVGToleranceGenerator extends AbstractSVGSAXGenerator {
    public void toSAX(ContentHandler handler, Map svgContext, DXFEntity entity,
        TransformContext transformContext) throws SAXException {
        //TODO implement the SVG tolerance generator
        DXFTolerance tolerance = (DXFTolerance) entity;
        DXFDimensionStyle style = tolerance.getDXFDocument()
                                           .getDXFDimensionStyle(tolerance.getStyleID());

        double angle = MathUtils.getAngle(tolerance.getXaxisDirection(),
                DXFConstants.DEFAULT_X_AXIS_VECTOR);
        double textHeight = style.getDoubleProperty(DXFDimensionStyle.PROPERTY_DIMTXT);
        double scale = style.getDoubleProperty(DXFDimensionStyle.PROPERTY_DIMSCALE,
                1.0);
        textHeight *= scale;
    }
}
