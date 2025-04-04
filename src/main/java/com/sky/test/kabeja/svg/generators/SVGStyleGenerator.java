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
import org.apache.commons.lang.StringUtils;

import com.sky.test.kabeja.dxf.DXFStyle;
import com.sky.test.kabeja.svg.SVGConstants;
import com.sky.test.kabeja.svg.SVGUtils;
import com.sky.test.kabeja.tools.FontManager;
import org.xml.sax.ContentHandler;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.AttributesImpl;

public class SVGStyleGenerator {
    /*
     * (non-Javadoc)
     *
     * @see de.miethxml.kabeja.svg.SVGGenerator#toSAX(org.xml.sax.ContentHandler)
     */
    public static void toSAX(ContentHandler handler, Map svgContext,
            DXFStyle style) throws SAXException {        
        FontManager manager = FontManager.getInstance();
        String fontID = manager.getFontDescriptionFromStyle(style);            

        if (fontID != null) {
            generateSAXFontDescription(handler, fontID);
        }
    }

    protected static void generateSAXFontDescription(ContentHandler handler,
            String font) throws SAXException {
        AttributesImpl attr = new AttributesImpl();
        SVGUtils.addAttribute(attr, SVGConstants.SVG_ATTRIBUTE_FONT_FAMILY, font);

        SVGUtils.startElement(handler, SVGConstants.SVG_FONT_FACE, attr);
        attr = new AttributesImpl();
        SVGUtils.startElement(handler, SVGConstants.SVG_FONT_FACE_SRC, attr);

        attr = new AttributesImpl();

        String url = FontManager.getInstance().getFontDescription(font) + "#"
                + font;
        attr.addAttribute(StringUtils.EMPTY, StringUtils.EMPTY, SVGConstants.XMLNS_XLINK,
                SVGUtils.DEFAUL_ATTRIBUTE_TYPE, SVGConstants.XLINK_NAMESPACE);
        attr.addAttribute(SVGConstants.XLINK_NAMESPACE, "href", SVGConstants.XLINK_HREF,
                SVGUtils.DEFAUL_ATTRIBUTE_TYPE, url);
        SVGUtils.emptyElement(handler, SVGConstants.SVG_FONT_FACE_URI, attr);
        SVGUtils.endElement(handler, SVGConstants.SVG_FONT_FACE_SRC);
        SVGUtils.endElement(handler, SVGConstants.SVG_FONT_FACE);
    }
}
