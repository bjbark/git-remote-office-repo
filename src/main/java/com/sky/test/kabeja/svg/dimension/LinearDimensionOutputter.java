/*
   Copyright 2005 Simon Mieth

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
package com.sky.test.kabeja.svg.dimension;

import java.util.Map;

import com.sky.test.kabeja.dxf.DXFDimension;
import com.sky.test.kabeja.dxf.DXFEntity;
import com.sky.test.kabeja.math.TransformContext;
import com.sky.test.kabeja.svg.SVGConstants;
import com.sky.test.kabeja.svg.SVGUtils;
import org.xml.sax.ContentHandler;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.AttributesImpl;


/**
 * @author <a href="mailto:simon.mieth@gmx.de">Simon Mieth</a>
 *
 */
public class LinearDimensionOutputter extends AbstractDimensionOutputter {
    public LinearDimensionOutputter(DXFDimension dim) {
        super(dim);
    }

    public void output(ContentHandler handler, Map svgContext)
        throws SAXException {
        if (dim.getDimensionBlock().length() > 0) {
            AttributesImpl attr = new AttributesImpl();
            StringBuilder buf = new StringBuilder();

            buf.append("translate(");
            buf.append((dim.getInsertPoint().getX()));
            buf.append(" ");
            buf.append((dim.getInsertPoint().getY()));
            buf.append(")");

            SVGUtils.addAttribute(attr, "transform", buf.toString());

            setCommonAttributes(attr, svgContext, dim);

            SVGUtils.startElement(handler, SVGConstants.SVG_GROUP, attr);
            attr = new AttributesImpl();
            attr.addAttribute(SVGConstants.XMLNS_NAMESPACE, "xlink",
                SVGConstants.XMLNS_XLINK, SVGUtils.DEFAUL_ATTRIBUTE_TYPE, SVGConstants.XLINK_NAMESPACE);
            attr.addAttribute(SVGConstants.XLINK_NAMESPACE, "href",
                SVGConstants.XLINK_HREF, SVGUtils.DEFAUL_ATTRIBUTE_TYPE,
                "#" + SVGUtils.validateID(dim.getDimensionBlock()));

            SVGUtils.emptyElement(handler, SVGConstants.SVG_USE, attr);

            SVGUtils.endElement(handler, SVGConstants.SVG_GROUP);
        }
    }

    public void toSAX(ContentHandler handler, Map svgContext, DXFEntity entity,
        TransformContext transformContext) throws SAXException {
        output(handler, svgContext);
    }
}
