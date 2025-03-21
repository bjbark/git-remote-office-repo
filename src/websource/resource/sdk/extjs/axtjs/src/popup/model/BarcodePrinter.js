/**
 * 바코드 프린터 출력 좌표
 */
Ext.define('Axt.popup.model.BarcodePrinter', { extend:'Ext.data.Model', 
    fields:[
        {name: 'seq',             type: 'int', defaultValue:1},  // seq
        {name: 'use_yn',          type: 'boolean', defaultValue:false},      // 현재 이 설정을 사용하고 있는지 여부
        
        {name: 'setting_name',    type: 'string', defaultValue:'' },  // 설정명 (메모와같은 의미)
        
        {name: 'printer_name',    type: 'string', defaultValue:Const.BarcodePrinterType.ZEBRA_ZM400 },  // 바코드 프린터의 모델명
        
        {name: 'port_name',       type: 'string'}, 				  // serial port (COM1, COM2...)
        {name: 'baud_rate',       type: 'int', defaultValue:9600},// serial port 연결속도
        
        {name: 'direction',       type: 'int' , defaultValue:1},  // 출력방향 (1: 정방향, 0: 역방향)
        
        // 상단
        {name: 'top_x',           type: 'int' },   // x좌표 시작
        {name: 'top_y',           type: 'int' },   // y좌표 시작   
        
        {name: 'paper_width',     type: 'int' , defaultValue:40},   // 용지 width
        {name: 'paper_height',    type: 'int' , defaultValue:23},   // 용지 height
        {name: 'paper_gap',       type: 'int' , defaultValue:3},   // 라벨용지 사이의 간격 (mm)
        
        
        // #1 
        {name: 'barcode_x',       type: 'int', defaultValue:3 },  // 바코드 x
        {name: 'barcode_y',       type: 'int', defaultValue:13 },  // 바코드 y
        {name: 'barcode_h',       type: 'int', defaultValue:5 },  // 바코드 높이
        {name: 'barcode_type',    type: 'string', defaultValue:'128' }, // 바코드 타입 (code128 type)
        {name: 'barcode_rotation',type: 'int', defaultValue:0 },   // 회전각도
        {name: 'barcode_narrow',  type: 'float', defaultValue:2 }, // narrow
        {name: 'barcode_wide',    type: 'float', defaultValue:2 }, // wide
        {name: 'barcode_speed',   type: 'float', defaultValue:3 }, // 출력속도
        {name: 'barcode_density', type: 'int', defaultValue:8 },   // 진한정도 (밀도)
        {name: 'barcode_text_visible', type: 'boolean', defaultValue:true }, // 바코드문자 표시
        
        {name: 'item_nm_x',       type: 'int', defaultValue:15 }, // 품명 x
        {name: 'item_nm_y',       type: 'int', defaultValue:1 },  // 품명 y
        {name: 'item_nm_fs',      type: 'int', defaultValue:1 },  // 품명 fs
        {name: 'item_nm_rotation',type: 'int', defaultValue:0 },  // 회전각도
        {name: 'item_nm_title',type: 'string', defaultValue:'' }, // 제목
      
        {name: 'item_sp_x',       type: 'int', defaultValue:0 },  // 규격 x
        {name: 'item_sp_y',       type: 'int', defaultValue:0 },  // 규격 y
        {name: 'item_sp_fs',      type: 'int', defaultValue:1 },  // 규격 fs
        {name: 'item_sp_rotation',type: 'int', defaultValue:0 },  // 회전각도
        {name: 'item_sp_title',type: 'string', defaultValue:'' }, // 제목
        
        {name: 'sobi_price_x',    type: 'int', defaultValue:0 },    // 소비자가 x
        {name: 'sobi_price_y',    type: 'int', defaultValue:0 },    // 소비자가 y
        {name: 'sobi_price_fs',   type: 'int', defaultValue:1 },    // 소비자가 fs
        {name: 'sobi_price_rotation',type: 'int', defaultValue:0 }, // 회전각도
        {name: 'sobi_price_title',type: 'string', defaultValue:'' },// 제목
        
        {name: 'sale_price_x',    type: 'int', defaultValue:20 },   // 판매가 x
        {name: 'sale_price_y',    type: 'int', defaultValue:6 },    // 판매가 y
        {name: 'sale_price_fs',   type: 'int', defaultValue:1 },    // 판매가 fs
        {name: 'sale_price_rotation',type: 'int', defaultValue:0 }, // 회전각도
        {name: 'sale_price_title',type: 'string', defaultValue:'' },// 제목
        
        {name: 'item_cd_x',    type: 'int', defaultValue:0 },     // 품목코드 x
        {name: 'item_cd_y',    type: 'int', defaultValue:0 },     // 품목코드 y
        {name: 'item_cd_fs',   type: 'int', defaultValue:1 },     // 품목코드 fs
        {name: 'item_cd_rotation',type: 'int', defaultValue:0 },  // 품목코드 회전각도
        {name: 'item_cd_title',type: 'string', defaultValue:'' }, // 품목코드 제목
        
        {name: 'tagcode_x',    type: 'int', defaultValue:0 },     // TagCode x
        {name: 'tagcode_y',    type: 'int', defaultValue:0 },     // TagCode y
        {name: 'tagcode_fs',   type: 'int', defaultValue:1 },     // TagCode fs
        {name: 'tagcode_rotation',type: 'int', defaultValue:0 },  // TagCode 회전각도
        {name: 'tagcode_title',type: 'string', defaultValue:'' }, // TagCode제목
        
        
        
        //////////////////////////////////////////
        
        // #2
        {name: 'barcode_x2',       type: 'int', defaultValue:0 },  // 바코드 x
        {name: 'barcode_y2',       type: 'int', defaultValue:0 },  // 바코드 y
        {name: 'barcode_h2',       type: 'int', defaultValue:5 },  // 바코드 높이
        {name: 'barcode_type2',    type: 'string', defaultValue:'128' }, // 바코드 타입 (code128 type)
        {name: 'barcode_rotation2',type: 'int', defaultValue:0 },   // 회전각도
        {name: 'barcode_narrow2',  type: 'float', defaultValue:2 }, // narrow
        {name: 'barcode_wide2',    type: 'float', defaultValue:2 }, // wide
        {name: 'barcode_speed2',   type: 'float', defaultValue:3 }, // 출력속도
        {name: 'barcode_density2', type: 'int', defaultValue:8 },   // 진한정도 (밀도)
        {name: 'barcode_text_visible2', type: 'boolean', defaultValue:true }, // 바코드문자 표시
        
        {name: 'item_nm_x2',       type: 'int', defaultValue:0 }, // 품명 x
        {name: 'item_nm_y2',       type: 'int', defaultValue:0 },  // 품명 y
        {name: 'item_nm_fs2',      type: 'int', defaultValue:1 },  // 품명 fs
        {name: 'item_nm_rotation2',type: 'int', defaultValue:0 },  // 회전각도
        {name: 'item_nm_title2',type: 'string', defaultValue:'' }, // 제목
        
        {name: 'item_sp_x2',       type: 'int', defaultValue:0 },  // 규격 x
        {name: 'item_sp_y2',       type: 'int', defaultValue:0 },  // 규격 y
        {name: 'item_sp_fs2',      type: 'int', defaultValue:1 },  // 규격 fs
        {name: 'item_sp_rotation2',type: 'int', defaultValue:0 },  // 회전각도
        {name: 'item_sp_title2',type: 'string', defaultValue:'' }, // 제목
        
        {name: 'sobi_price_x2',    type: 'int', defaultValue:0 },    // 소비자가 x
        {name: 'sobi_price_y2',    type: 'int', defaultValue:0 },    // 소비자가 y
        {name: 'sobi_price_fs2',   type: 'int', defaultValue:1 },    // 소비자가 fs
        {name: 'sobi_price_rotation2',type: 'int', defaultValue:0 }, // 회전각도
        {name: 'sobi_price_title2',type: 'string', defaultValue:'' },// 제목
        
        {name: 'sale_price_x2',    type: 'int', defaultValue:0 },   // 판매가 x
        {name: 'sale_price_y2',    type: 'int', defaultValue:0 },    // 판매가 y
        {name: 'sale_price_fs2',   type: 'int', defaultValue:1 },    // 판매가 fs
        {name: 'sale_price_rotation2',type: 'int', defaultValue:0 }, // 회전각도
        {name: 'sale_price_title2',type: 'string', defaultValue:'' },// 제목
        
        {name: 'item_cd_x2',    type: 'int', defaultValue:0 },     // 품목코드 문자 x
        {name: 'item_cd_y2',    type: 'int', defaultValue:0 },     // 품목코드 문자 y
        {name: 'item_cd_fs2',   type: 'int', defaultValue:1 },     // 품목코드 문자 fs
        {name: 'item_cd_rotation2',type: 'int', defaultValue:0 },  // 품목코드 문자 회전각도
        {name: 'item_cd_title2',type: 'string', defaultValue:'' }, // 품목코드 문자 제목
        
        {name: 'tagcode_x2',    type: 'int', defaultValue:0 },     // TagCode x
        {name: 'tagcode_y2',    type: 'int', defaultValue:0 },     // TagCode y
        {name: 'tagcode_fs2',   type: 'int', defaultValue:1 },     // TagCode fs
        {name: 'tagcode_rotation2',type: 'int', defaultValue:0 },  // TagCode 회전각도
        {name: 'tagcode_title2',type: 'string', defaultValue:'' }, // TagCode제목
    ]
});

/* 
 * 128 - Code 128, switching code subset A, B, C automatically
 * 128A - 
 * 128B - 
 * 128C - 
 * EAN128 - 
 * 25 - Interleaved 2 of 5
 * 25C - Interleaved 2 of 5 with check digits
 * 39 Code 39
	39C Code 39 with check digits
	93 Code 93
	EAN13 EAN 13
	EAN13+2 EAN 13 with 2 digits add-on
	EAN13+5 EAN 13 with 5 digits add-on
	EAN8 EAN 8
	EAN8+2 EAN 8 with 2 digits add-on
	EAN8+5 EAN 8 with 5 digits add-on
	CODA Codabar
	POST Postnet
	UPCA UPC-A
	UPCA+2 UPC-A with 2 digits add-on
	UPCA+5 UPC-A with 5 digits add-on
	UPCE UPC-E
	UPCE+2 UPC-E with 2 digits add-on
	UPCE+5 UPC-E with 5 digits add-on
	CPOST China post code
	MSI MSI code
	MSIC
	PLESSEY PLESSEY code
	ITF14 ITF 14 code
	EAN14 EAN 14 code
 */