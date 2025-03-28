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
package com.sky.test.kabeja.dxf;

import com.sky.test.kabeja.dxf.helpers.Vector;


/**
 * @author <a href="mailto:simon.mieth@gmx.de>Simon Mieth</a>
 *
 */
public class DXFConstants {
    public final static int COMMAND_CODE = 0;
    public static final String DEFAULT_LAYER = "0";
    public final static Vector DEFAULT_X_AXIS_VECTOR = new Vector(1.0, 0.0, 0.0);
    public final static Vector DEFAULT_Y_AXIS_VECTOR = new Vector(0.0, 1.0, 0.0);
    public final static Vector DEFAULT_Z_AXIS_VECTOR = new Vector(0.0, 0.0, 1.0);
    public final static String DICTIONARY_KEY_GROUP = "ACAD_GROUP";
    public final static String DICTIONARY_KEY_LAYOUT = "ACAD_LAYOUT";
    public final static String DICTIONARY_KEY_MLINESTYLE = "ACAD_MLINESTYLE";
    public final static String DICTIONARY_KEY_PLOTSETTINGS = "ACAD_PLOTSETTINGS";
    public final static String DICTIONARY_KEY_PLOTSTYLENAME = "ACAD_PLOTSTYLENAME";
    public final static String END_STREAM = "EOF";
    public final static String ENTITY_TYPE_3DFACE = "3DFACE";
    public final static String ENTITY_TYPE_3DSOLID = "3DSOLID";

    //Entity types
    public final static String ENTITY_TYPE_ARC = "ARC";
    public final static String ENTITY_TYPE_ATTDEF = "ATTDEF";
    public final static String ENTITY_TYPE_ATTRIB = "ATTRIB";
    public final static String ENTITY_TYPE_BODY = "BODY";
    public final static String ENTITY_TYPE_CIRCLE = "CIRCLE";
    public final static String ENTITY_TYPE_DIMENSION = "DIMENSION";
    public final static String ENTITY_TYPE_ELLIPSE = "ELLIPSE";
    public final static String ENTITY_TYPE_HATCH = "HATCH";
    public final static String ENTITY_TYPE_IMAGE = "IMAGE";
    public final static String ENTITY_TYPE_INSERT = "INSERT";
    public final static String ENTITY_TYPE_LEADER = "LEADER";
    public final static String ENTITY_TYPE_LINE = "LINE";
    public final static String ENTITY_TYPE_LWPOLYLINE = "LWPOLYLINE";
    public final static String ENTITY_TYPE_MLINE = "MLINE";
    public final static String ENTITY_TYPE_MTEXT = "MTEXT";
    public final static String ENTITY_TYPE_POINT = "POINT";
    public final static String ENTITY_TYPE_POLYLINE = "POLYLINE";
    public final static String ENTITY_TYPE_RAY = "RAY";
    public final static String ENTITY_TYPE_REGION = "REGION";
    public final static String ENTITY_TYPE_SHAPE = "SHAPE";
    public final static String ENTITY_TYPE_SOLID = "SOLID";
    public final static String ENTITY_TYPE_SPLINE = "SPLINE";
    public final static String ENTITY_TYPE_TABLE = "TABLE";
    public final static String ENTITY_TYPE_TEXT = "TEXT";
    public final static String ENTITY_TYPE_TOLERANCE = "TOLERANCE";
    public final static String ENTITY_TYPE_TRACE = "TRACE";
    public final static String ENTITY_TYPE_VERTEX = "VERTEX";
    public final static String ENTITY_TYPE_VIEWPORT = "VIEWPORT";
    public final static String ENTITY_TYPE_XLINE = "XLINE";
    public final static int ENVIRONMENT_VARIABLE_LWDEFAULT = 25;
    public final static int GROUPCODE_STANDARD_FLAGS = 70;
    public final static int GROUPCODE_STANDARD_LAYER = 8;
    public final static int GROUPCODE_SUBCLASS_MARKER = 100;
    public static final String HEADER_VARIABLE_ACADMAINTVER = "$ACADMAINTVER";
    public static final String HEADER_VARIABLE_ACADVER = "$ACADVER";
    public static final String HEADER_VARIABLE_ANGBASE = "$ANGBASE";
    public static final String HEADER_VARIABLE_ANGDIR = "$ANGDIR";
    public static final String HEADER_VARIABLE_ATTMODE = "$ATTMODE";
    public static final String HEADER_VARIABLE_AUNITS = "$AUNITS";
    public static final String HEADER_VARIABLE_AUPREC = "$AUPREC";
    public static final String HEADER_VARIABLE_CECOLOR = "$CECOLOR";
    public static final String HEADER_VARIABLE_CELTSCALE = "$CELTSCALE";
    public static final String HEADER_VARIABLE_CELTYPE = "$CELTYPE";
    public static final String HEADER_VARIABLE_CELWEIGHT = "$CELWEIGHT";
    public static final String HEADER_VARIABLE_CEPSNID = "$CEPSNID";
    public static final String HEADER_VARIABLE_CEPSNTYPE = "$CEPSNTYPE";
    public static final String HEADER_VARIABLE_CHAMFERA = "$CHAMFERA";
    public static final String HEADER_VARIABLE_CHAMFERB = "$CHAMFERB";
    public static final String HEADER_VARIABLE_CHAMFERC = "$CHAMFERC";
    public static final String HEADER_VARIABLE_CHAMFERD = "$CHAMFERD";
    public static final String HEADER_VARIABLE_CLAYER = "$CLAYER";
    public static final String HEADER_VARIABLE_CMLJUST = "$CMLJUST";
    public static final String HEADER_VARIABLE_CMLSCALE = "$CMLSCALE";
    public static final String HEADER_VARIABLE_CMLSTYLE = "$CMLSTYLE";
    public static final String HEADER_VARIABLE_DIMADEC = "$DIMADEC";
    public static final String HEADER_VARIABLE_DIMALT = "$DIMALT";
    public static final String HEADER_VARIABLE_DIMALTD = "$DIMALTD";
    public static final String HEADER_VARIABLE_DIMALTF = "$DIMALTF";
    public static final String HEADER_VARIABLE_DIMALTRND = "$DIMALTRND";
    public static final String HEADER_VARIABLE_DIMALTTD = "$DIMALTTD";
    public static final String HEADER_VARIABLE_DIMALTTZ = "$DIMALTTZ";
    public static final String HEADER_VARIABLE_DIMALTU = "$DIMALTU";
    public static final String HEADER_VARIABLE_DIMALTZ = "$DIMALTZ";
    public static final String HEADER_VARIABLE_DIMAPOST = "$DIMAPOST";
    public static final String HEADER_VARIABLE_DIMASO = "$DIMASO";
    public static final String HEADER_VARIABLE_DIMASSOC = "$DIMASSOC";
    public static final String HEADER_VARIABLE_DIMASZ = "$DIMASZ";
    public static final String HEADER_VARIABLE_DIMATFIT = "$DIMATFIT";
    public static final String HEADER_VARIABLE_DIMAUNIT = "$DIMAUNIT";
    public static final String HEADER_VARIABLE_DIMAZIN = "$DIMAZIN";
    public static final String HEADER_VARIABLE_DIMBLK = "$DIMBLK";
    public static final String HEADER_VARIABLE_DIMBLK1 = "$DIMBLK1";
    public static final String HEADER_VARIABLE_DIMCEN = "$DIMCEN";
    public static final String HEADER_VARIABLE_DIMCLRD = "$DIMCLRD";
    public static final String HEADER_VARIABLE_DIMCLRE = "$DIMCLRE";
    public static final String HEADER_VARIABLE_DIMCLRT = "$DIMCLRT";
    public static final String HEADER_VARIABLE_DIMDEC = "$DIMDEC";
    public static final String HEADER_VARIABLE_DIMDLE = "$DIMDLE";
    public static final String HEADER_VARIABLE_DIMDLI = "$DIMDLI";
    public static final String HEADER_VARIABLE_DIMDSEP = "$DIMDSEP";
    public static final String HEADER_VARIABLE_DIMEXE = "$DIMEXE";
    public static final String HEADER_VARIABLE_DIMEXO = "$DIMEXO";
    public static final String HEADER_VARIABLE_DIMFAC = "$DIMFAC";
    public static final String HEADER_VARIABLE_DIMGAP = "$DIMGAP";
    public static final String HEADER_VARIABLE_DIMJUST = "$DIMJUST";
    public static final String HEADER_VARIABLE_DIMLDRBLK = "$DIMLDRBLK";
    public static final String HEADER_VARIABLE_DIMLFAC = "$DIMLFAC";
    public static final String HEADER_VARIABLE_DIMLIM = "$DIMLIM";
    public static final String HEADER_VARIABLE_DIMLUNIT = "$DIMLUNIT";
    public static final String HEADER_VARIABLE_DIMLWD = "$DIMLWD";
    public static final String HEADER_VARIABLE_DIMLWE = "$DIMLWE";
    public static final String HEADER_VARIABLE_DIMPOST = "$DIMPOST";
    public static final String HEADER_VARIABLE_DIMRND = "$DIMRND";
    public static final String HEADER_VARIABLE_DIMSAH = "$DIMSAH";
    public static final String HEADER_VARIABLE_DIMSCALE = "$DIMSCALE";
    public static final String HEADER_VARIABLE_DIMSD1 = "$DIMSD1";
    public static final String HEADER_VARIABLE_DIMSD2 = "$DIMSD2";
    public static final String HEADER_VARIABLE_DIMSE1 = "$DIMSE1";
    public static final String HEADER_VARIABLE_DIMSE2 = "$DIMSE2";
    public static final String HEADER_VARIABLE_DIMSHO = "$DIMSHO";
    public static final String HEADER_VARIABLE_DIMSOXD = "$DIMSOXD";
    public static final String HEADER_VARIABLE_DIMSTYLE = "$DIMSTYLE";
    public static final String HEADER_VARIABLE_DIMTAD = "$DIMTAD";
    public static final String HEADER_VARIABLE_DIMTDEC = "$DIMTDEC";
    public static final String HEADER_VARIABLE_DIMTFAC = "$DIMTFAC";
    public static final String HEADER_VARIABLE_DIMTIH = "$DIMTIH";
    public static final String HEADER_VARIABLE_DIMTIX = "$DIMTIX";
    public static final String HEADER_VARIABLE_DIMTM = "$DIMTM";
    public static final String HEADER_VARIABLE_DIMTMOVE = "$DIMTMOVE";
    public static final String HEADER_VARIABLE_DIMTOFL = "$DIMTOFL";
    public static final String HEADER_VARIABLE_DIMTOH = "$DIMTOH";
    public static final String HEADER_VARIABLE_DIMTOL = "$DIMTOL";
    public static final String HEADER_VARIABLE_DIMTOLJ = "$DIMTOLJ";
    public static final String HEADER_VARIABLE_DIMTP = "$DIMTP";
    public static final String HEADER_VARIABLE_DIMTSZ = "$DIMTSZ";
    public static final String HEADER_VARIABLE_DIMTVP = "$DIMTVP";
    public static final String HEADER_VARIABLE_DIMTXSTY = "$DIMTXSTY";
    public static final String HEADER_VARIABLE_DIMTXT = "$DIMTXT";
    public static final String HEADER_VARIABLE_DIMTZIN = "$DIMTZIN";
    public static final String HEADER_VARIABLE_DIMUPT = "$DIMUPT";
    public static final String HEADER_VARIABLE_DIMZIN = "$DIMZIN";
    public static final String HEADER_VARIABLE_DISPSILH = "$DISPSILH";
    public static final String HEADER_VARIABLE_DWGCODEPAGE = "$DWGCODEPAGE";
    public static final String HEADER_VARIABLE_ELEVATION = "$ELEVATION";
    public static final String HEADER_VARIABLE_ENDCAPS = "$ENDCAPS";
    public static final String HEADER_VARIABLE_EXTMAX = "$EXTMAX";
    public static final String HEADER_VARIABLE_EXTMIN = "$EXTMIN";
    public static final String HEADER_VARIABLE_EXTNAMES = "$EXTNAMES";

    /**
     * Some older header variables maybe overriden by the vport table
     */
    public static final String HEADER_VARIABLE_FASTZOOM = "$FASTZOOM";
    public static final String HEADER_VARIABLE_FILLETRAD = "$FILLETRAD";
    public static final String HEADER_VARIABLE_FILLMODE = "$FILLMODE";
    public static final String HEADER_VARIABLE_FINGERPRINTGUID = "$FINGERPRINTGUID";
    public static final String HEADER_VARIABLE_GRIDMODE = "$GRIDMODE";
    public static final String HEADER_VARIABLE_GRIDUNIT = "$GRIDUNIT";
    public static final String HEADER_VARIABLE_HALOGAP = "$HALOGAP";
    public static final String HEADER_VARIABLE_HANDSEED = "$HANDSEED";
    public static final String HEADER_VARIABLE_HIDETEXT = "$HIDETEXT";
    public static final String HEADER_VARIABLE_HYPERLINKBASE = "$HYPERLINKBASE";
    public static final String HEADER_VARIABLE_INDEXCTL = "$INDEXCTL";
    public static final String HEADER_VARIABLE_INSBASE = "$INSBASE";
    public static final String HEADER_VARIABLE_INSUNITS = "$INSUNITS";
    public static final String HEADER_VARIABLE_INTERSECTIONCOLOR = "$INTERSECTIONCOLOR";
    public static final String HEADER_VARIABLE_INTERSECTIONDISPLAY = "$INTERSECTIONDISPLAY";
    public static final String HEADER_VARIABLE_JOINSTYLE = "$JOINSTYLE";
    public static final String HEADER_VARIABLE_LIMCHECK = "$LIMCHECK";
    public static final String HEADER_VARIABLE_LIMMAX = "$LIMMAX";
    public static final String HEADER_VARIABLE_LIMMIN = "$LIMMIN";
    public static final String HEADER_VARIABLE_LTSCALE = "$LTSCALE";
    public static final String HEADER_VARIABLE_LUNITS = "$LUNITS";
    public static final String HEADER_VARIABLE_LUPREC = "$LUPREC";
    public static final String HEADER_VARIABLE_LWDISPLAY = "$LWDISPLAY";
    public static final String HEADER_VARIABLE_MAXACTVP = "$MAXACTVP";
    public static final String HEADER_VARIABLE_MEASUREMENT = "$MEASUREMENT";
    public static final String HEADER_VARIABLE_MENU = "$MENU";
    public static final String HEADER_VARIABLE_MIRRTEXT = "$MIRRTEXT";
    public static final String HEADER_VARIABLE_OBSCOLOR = "$OBSCOLOR";
    public static final String HEADER_VARIABLE_OBSLTYPE = "$OBSLTYPE";
    public static final String HEADER_VARIABLE_ORTHOMODE = "$ORTHOMODE";
    public static final String HEADER_VARIABLE_PDMODE = "$PDMODE";
    public static final String HEADER_VARIABLE_PDSIZE = "$PDSIZE";
    public static final String HEADER_VARIABLE_PELEVATION = "$PELEVATION";
    public static final String HEADER_VARIABLE_PEXTMAX = "$PEXTMAX";
    public static final String HEADER_VARIABLE_PEXTMIN = "$PEXTMIN";
    public static final String HEADER_VARIABLE_PINSBASE = "$PINSBASE";
    public static final String HEADER_VARIABLE_PLIMCHECK = "$PLIMCHECK";
    public static final String HEADER_VARIABLE_PLIMMAX = "$PLIMMAX";
    public static final String HEADER_VARIABLE_PLIMMIN = "$PLIMMIN";
    public static final String HEADER_VARIABLE_PLINEGEN = "$PLINEGEN";
    public static final String HEADER_VARIABLE_PLINEWID = "$PLINEWID";
    public static final String HEADER_VARIABLE_PROJECTNAME = "$PROJECTNAME";
    public static final String HEADER_VARIABLE_PROXYGRAPHICS = "$PROXYGRAPHICS";
    public static final String HEADER_VARIABLE_PSLTSCALE = "$PSLTSCALE";
    public static final String HEADER_VARIABLE_PSTYLEMODE = "$PSTYLEMODE";
    public static final String HEADER_VARIABLE_PSVPSCALE = "$PSVPSCALE";
    public static final String HEADER_VARIABLE_PUCSBASE = "$PUCSBASE";
    public static final String HEADER_VARIABLE_PUCSNAME = "$PUCSNAME";
    public static final String HEADER_VARIABLE_PUCSORG = "$PUCSORG";
    public static final String HEADER_VARIABLE_PUCSORGBACK = "$PUCSORGBACK";
    public static final String HEADER_VARIABLE_PUCSORGBOTTOM = "$PUCSORGBOTTOM";
    public static final String HEADER_VARIABLE_PUCSORGFRONT = "$PUCSORGFRONT";
    public static final String HEADER_VARIABLE_PUCSORGLEFT = "$PUCSORGLEFT";
    public static final String HEADER_VARIABLE_PUCSORGRIGHT = "$PUCSORGRIGHT";
    public static final String HEADER_VARIABLE_PUCSORGTOP = "$PUCSORGTOP";
    public static final String HEADER_VARIABLE_PUCSORTHOREF = "$PUCSORTHOREF";
    public static final String HEADER_VARIABLE_PUCSORTHOVIEW = "$PUCSORTHOVIEW";
    public static final String HEADER_VARIABLE_PUCSXDIR = "$PUCSXDIR";
    public static final String HEADER_VARIABLE_PUCSYDIR = "$PUCSYDIR";
    public static final String HEADER_VARIABLE_QTEXTMODE = "$QTEXTMODE";
    public static final String HEADER_VARIABLE_REGENMODE = "$REGENMODE";
    public static final String HEADER_VARIABLE_SHADEDGE = "$SHADEDGE";
    public static final String HEADER_VARIABLE_SHADEDIF = "$SHADEDIF";
    public static final String HEADER_VARIABLE_SKETCHINC = "$SKETCHINC";
    public static final String HEADER_VARIABLE_SKPOLY = "$SKPOLY";
    public static final String HEADER_VARIABLE_SNAPANG = "$SNAPANG";
    public static final String HEADER_VARIABLE_SNAPBASE = "$SNAPBASE";
    public static final String HEADER_VARIABLE_SNAPISOPAIR = "$SNAPISOPAIR";
    public static final String HEADER_VARIABLE_SNAPMODE = "$SNAPMODE";
    public static final String HEADER_VARIABLE_SNAPSTYLE = "$SNAPSTYLE";
    public static final String HEADER_VARIABLE_SNAPUNIT = "$SNAPUNIT";
    public static final String HEADER_VARIABLE_SORTENTS = "$SORTENTS";
    public static final String HEADER_VARIABLE_SPLFRAME = "$SPLFRAME";
    public static final String HEADER_VARIABLE_SPLINESEGS = "$SPLINESEGS";
    public static final String HEADER_VARIABLE_SPLINETYPE = "$SPLINETYPE";
    public static final String HEADER_VARIABLE_SURFTAB1 = "$SURFTAB1";
    public static final String HEADER_VARIABLE_SURFTAB2 = "$SURFTAB2";
    public static final String HEADER_VARIABLE_SURFTYPE = "$SURFTYPE";
    public static final String HEADER_VARIABLE_SURFU = "$SURFU";
    public static final String HEADER_VARIABLE_SURFV = "$SURFV";
    public static final String HEADER_VARIABLE_TDCREATE = "$TDCREATE";
    public static final String HEADER_VARIABLE_TDINDWG = "$TDINDWG";
    public static final String HEADER_VARIABLE_TDUCREATE = "$TDUCREATE";
    public static final String HEADER_VARIABLE_TDUPDATE = "$TDUPDATE";
    public static final String HEADER_VARIABLE_TDUSRTIMER = "$TDUSRTIMER";
    public static final String HEADER_VARIABLE_TDUUPDATE = "$TDUUPDATE";
    public static final String HEADER_VARIABLE_TEXTSIZE = "$TEXTSIZE";
    public static final String HEADER_VARIABLE_TEXTSTYLE = "$TEXTSTYLE";
    public static final String HEADER_VARIABLE_THICKNESS = "$THICKNESS";
    public static final String HEADER_VARIABLE_TILEMODE = "$TILEMODE";
    public static final String HEADER_VARIABLE_TRACEWID = "$TRACEWID";
    public static final String HEADER_VARIABLE_TREEDEPTH = "$TREEDEPTH";
    public static final String HEADER_VARIABLE_UCSBASE = "$UCSBASE";
    public static final String HEADER_VARIABLE_UCSNAME = "$UCSNAME";
    public static final String HEADER_VARIABLE_UCSORG = "$UCSORG";
    public static final String HEADER_VARIABLE_UCSORGBACK = "$UCSORGBACK";
    public static final String HEADER_VARIABLE_UCSORGBOTTOM = "$UCSORGBOTTOM";
    public static final String HEADER_VARIABLE_UCSORGFRONT = "$UCSORGFRONT";
    public static final String HEADER_VARIABLE_UCSORGLEFT = "$UCSORGLEFT";
    public static final String HEADER_VARIABLE_UCSORGRIGHT = "$UCSORGRIGHT";
    public static final String HEADER_VARIABLE_UCSORGTOP = "$UCSORGTOP";
    public static final String HEADER_VARIABLE_UCSORTHOREF = "$UCSORTHOREF";
    public static final String HEADER_VARIABLE_UCSORTHOVIEW = "$UCSORTHOVIEW";
    public static final String HEADER_VARIABLE_UCSXDIR = "$UCSXDIR";
    public static final String HEADER_VARIABLE_UCSYDIR = "$UCSYDIR";
    public static final String HEADER_VARIABLE_UNITMODE = "$UNITMODE";
    public static final String HEADER_VARIABLE_USERI1 = "$USERI1";
    public static final String HEADER_VARIABLE_USERR1 = "$USERR1";
    public static final String HEADER_VARIABLE_USRTIMER = "$USRTIMER";
    public static final String HEADER_VARIABLE_VERSIONGUID = "$VERSIONGUID";
    public static final String HEADER_VARIABLE_VIEWCTR = "$VIEWCTR";
    public static final String HEADER_VARIABLE_VIEWDIR = "$VIEWDIR";
    public static final String HEADER_VARIABLE_VIEWSIZE = "$VIEWSIZE";
    public static final String HEADER_VARIABLE_VISRETAIN = "$VISRETAIN";
    public static final String HEADER_VARIABLE_WORLDVIEW = "$WORLDVIEW";
    public static final String HEADER_VARIABLE_XCLIPFRAME = "$XCLIPFRAME";
    public static final String HEADER_VARIABLE_XEDIT = "$XEDIT";
    public final static String LAYOUT_DEFAULT_NAME = "Model";
    public final static String OBJECT_TYPE_ACAD_PROXY_OBJECT = "ACAD_PROXY_OBJERCT";
    public final static String OBJECT_TYPE_ACDBDICTIONARYWDFLT = "ACDBDICTIONARYWDFLT";
    public final static String OBJECT_TYPE_ACDBPLACEHOLDER = "ACDBPLACEHOLDER";
    public final static String OBJECT_TYPE_DICTIONARY = "DICTIONARY";
    public final static String OBJECT_TYPE_DICTIONARYVAR = "DICTIONARYVAR";
    public final static String OBJECT_TYPE_DIMASSOC = "DIMASSOC";
    public final static String OBJECT_TYPE_FIELD = "FIELD";
    public final static String OBJECT_TYPE_GROUP = "GROUP";
    public final static String OBJECT_TYPE_IDBUFFER = "IDBUFFER";

    //Object types
    public final static String OBJECT_TYPE_IMAGEDEF = "IMAGEDEF";
    public final static String OBJECT_TYPE_IMAGEDEF_REACTOR = "IMAGEDEF_REACTOR";
    public final static String OBJECT_TYPE_LAYER_FILTER = "LAYER_FILTER";
    public final static String OBJECT_TYPE_LAYER_INDEX = "LAYER_INDEX";
    public final static String OBJECT_TYPE_LAYOUT = "LAYOUT";
    public final static String OBJECT_TYPE_MATERIAL = "MATERIAL";
    public final static String OBJECT_TYPE_MLINESTYLE = "MLINESTYLE";
    public final static String OBJECT_TYPE_OBJECT_PTR = "OBJECT_PTR";
    public final static String OBJECT_TYPE_PLOTSETTINGS = "PLOTSETTINGS";
    public final static String OBJECT_TYPE_RASTERVARIABLES = "RASTERVARIABLES";
    public final static String OBJECT_TYPE_SORTENTSTABLE = "SORTENTSTABLE";
    public final static String OBJECT_TYPE_SPATIAL_FILTER = "SPATIAL_FILTER";
    public final static String OBJECT_TYPE_SPATIAL_INDEX = "SPATIAL_INDEX";
    public final static String OBJECT_TYPE_TABLESTYLE = "TABLESTYLE";
    public final static String OBJECT_TYPE_VBA_PROJECT = "VBA_PROJECT";
    public final static String OBJECT_TYPE_WIPEOUTVARIABLES = "WIPEOUTVARIABLES";
    public final static String OBJECT_TYPE_XRECORD = "XRECORD";
    public final static int PAPER_UNIT_INCH = 0;
    public final static int PAPER_UNIT_MILLIMETER = 1;
    public final static int PAPER_UNIT_PIXEL = 2;
    public final static int PLOT_STYLE_DRAWING_EXTENTS = 1;
    public final static int PLOT_STYLE_DRAWING_LIMITS = 2;
    public final static int PLOT_STYLE_LAST_SCREEN_DISPLAY = 0;
    public final static int PLOT_STYLE_LAYOUT = 5;
    public final static int PLOT_STYLE_SPECIFIECED_VIEW = 3;
    public final static int PLOT_STYLE_SPECIFIECED_WINDOW = 4;
    public static double POINT_CONNECTION_RADIUS = 0.0001;
    public final static String SECTION_BLOCKS = "BLOCKS";
    public final static String SECTION_CLASSES = "CLASSES";
    public final static String SECTION_END = "ENDSEC";
    public final static String SECTION_ENTITIES = "ENTITIES";
    public final static String SECTION_HEADER = "HEADER";
    public final static String SECTION_OBJECTS = "OBJECTS";
    public final static String SECTION_START = "SECTION";
    public final static String SECTION_TABLES = "TABLES";
    public final static String SECTION_THUMBNAILIMAGE = "THUMBNAILIMAGE";
    public final static String TABLE_KEY_APPID = "APPID";
    public final static String TABLE_KEY_BLOCK_RECORD = "BLOCK_RECORD";
    public final static String TABLE_KEY_DIMSTYLE = "DIMSTYLE";
    public final static String TABLE_KEY_LAYER = "LAYER";
    public final static String TABLE_KEY_LTYPE = "LTYPE";
    public final static String TABLE_KEY_STYLE = "STYLE";
    public final static String TABLE_KEY_UCS = "UCS";
    public final static String TABLE_KEY_VIEW = "VIEW";
    public final static String TABLE_KEY_VPORT = "VPORT";
}
