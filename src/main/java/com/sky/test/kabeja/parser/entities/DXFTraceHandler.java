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
package com.sky.test.kabeja.parser.entities;

import com.sky.test.kabeja.dxf.DXFConstants;
import com.sky.test.kabeja.dxf.DXFTrace;


/**
 * @author <a href="mailto:simon.mieth@gmx.de">Simon Mieth</a>
 *
 */
public class DXFTraceHandler extends DXFSolidHandler {
    public String getDXFEntityName() {
        return DXFConstants.ENTITY_TYPE_TRACE;
    }

    /* (non-Javadoc)
     * @see de.miethxml.kabeja.parser.entities.DXFEntityHandler#startDXFEntity()
     */
    public void startDXFEntity() {
        solid = new DXFTrace();
    }
}
