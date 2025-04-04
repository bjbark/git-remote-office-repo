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
package com.sky.test.kabeja.processing;

import java.io.File;
import java.util.Iterator;
import java.util.Map;

import com.sky.test.kabeja.dxf.DXFConstants;
import com.sky.test.kabeja.dxf.DXFDocument;
import com.sky.test.kabeja.dxf.DXFImage;
import com.sky.test.kabeja.dxf.DXFLayer;
import com.sky.test.kabeja.dxf.objects.DXFImageDefObject;


/**
 *
 * @author <a href="mailto:simon.mieth@gmx.de">Simon Mieth</a>
 */
public class ImageFilter extends AbstractPostProcessor {
    /*
     * (non-Javadoc)
     *
     * @see com.sky.test.kabeja.tools.PostProcessor#process(com.sky.test.kabeja.dxf.DXFDocument,
     *      java.util.Map)
     */
    public void process(DXFDocument doc, Map context) throws ProcessorException {
        Iterator i = doc.getDXFLayerIterator();

        while (i.hasNext()) {
            DXFLayer l = (DXFLayer) i.next();

            if (l.hasDXFEntities(DXFConstants.ENTITY_TYPE_IMAGE)) {
                Iterator in = l.getDXFEntities(DXFConstants.ENTITY_TYPE_IMAGE)
                               .iterator();

                while (in.hasNext()) {
                    DXFImage img = (DXFImage) in.next();
                    String imgDef = img.getImageDefObjectID();
                    DXFImageDefObject def = (DXFImageDefObject) doc.getDXFObjectByID(imgDef);
                    File f = new File(def.getFilename());

                    if (!f.exists()) {
                        in.remove();
                    }
                }
            }
        }
    }
}
