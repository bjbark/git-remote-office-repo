/**
 * 세금계산서 출력 좌표
 */
Ext.define('Axt.popup.model.InvoiceTax', { extend:'Ext.data.Model', 
    fields:[
        // 상단
        {name: 'top_x',             type: 'int'},                     // x좌표 시작
        {name: 'top_y',             type: 'int'},                     // y좌표 시작   
        {name: 'send_biz_x',        type: 'int',    defaultValue:50}, // 공급자의 등록번호, 상호, 주소, 업태가 시작되는 x좌표
        

        // 직인 이미지 출력
        {name: 'stamp_yn',          type: 'boolean', defaultValue:true}, // 직인 이미지 출력
        // 영수/청구 마크 미표시
        {name: 'pay_gb_hidden_yn',  type: 'boolean', defaultValue:false}, // 
        
        // 공급자
        {name: 'send_biz_no_y',     type: 'int',    defaultValue:43}, // 등록번호 y   
        {name: 'send_biz_no_fs',    type: 'int',    defaultValue:8},  // 등록번호 폰트크기  
        
        {name: 'send_biz_tel_no_x', type: 'int',    defaultValue:80}, // 전화번호 x  
        {name: 'send_biz_tel_no_y', type: 'int',    defaultValue:41}, // 전화번호 y  
        {name: 'send_biz_tel_no_fs',type: 'int',    defaultValue:6},  // 전화번호 폰트크기  
        {name: 'send_biz_fax_no_x', type: 'int',    defaultValue:80}, // fax x  
        {name: 'send_biz_fax_no_y', type: 'int',    defaultValue:45}, // fax y  
        {name: 'send_biz_fax_no_fs',type: 'int',    defaultValue:6},  // fax 폰트크기  
        
        {name: 'send_biz_nm_y',     type: 'int',    defaultValue:52}, // 상호 y  
        {name: 'send_biz_nm_fs',    type: 'int',    defaultValue:8},  // 상호 폰트크기  
        {name: 'send_biz_owner_x',  type: 'int',    defaultValue:82}, // 성명 x  
        {name: 'send_biz_owner_fs', type: 'int',    defaultValue:8},  // 성명 폰트크기  
        {name: 'send_biz_addr_y',   type: 'int',    defaultValue:59}, // 주소 y  
        {name: 'send_biz_addr_fs',  type: 'int',    defaultValue:8},  // 주소 폰트크기
        {name: 'send_biz_addr_lh',  type: 'int',    defaultValue:4},  // 주소 줄간격
        {name: 'send_biz_cond_y',   type: 'int',    defaultValue:70}, // 업태 y 
        {name: 'send_biz_cond_fs',  type: 'int',    defaultValue:8},  // 업태 폰트크기 
        {name: 'send_biz_types_x',  type: 'int',    defaultValue:75}, // 종목 x
        {name: 'send_biz_types_fs', type: 'int',    defaultValue:8},  // 종목 폰트크기
        
        // 공급받는자
        {name: 'recv_biz_x',        type: 'int',    defaultValue:122}, // 등록번호 (공급자의 등록번호 x좌표부터의 거리

        {name: 'recv_biz_tel_no_x', type: 'int',    defaultValue:158}, // 전화번호 x  
        {name: 'recv_biz_fax_no_x', type: 'int',    defaultValue:158}, // fax x  
        
        {name: 'recv_biz_owner_x',  type: 'int',    defaultValue:161}, // 성명 (공급자의 성명 x좌표부터의 거리)  
        {name: 'recv_biz_types_x',  type: 'int',    defaultValue:161}, // 종목 (공급자의 업종(종목) x좌표부터의 거리)
        
        // 공급가액/세액
        {name: 'money_year_x',      type: 'int',    defaultValue:31},  // 년 x
        {name: 'money_month_x',     type: 'int',    defaultValue:41},  // 월 x
        {name: 'money_day_x',       type: 'int',    defaultValue:50},  // 일 x
        {name: 'money_empty_x',     type: 'int',    defaultValue:60},  // 공란수 x
        
        {name: 'money_y',           type: 'int',    defaultValue:88},  // 공급가액, 세액 부분의 y
        {name: 'money_fs',          type: 'int',    defaultValue:9},   // 공급가액, 세액 부분의 폰트크기
        {name: 'money_subtotal_x',  type: 'int',    defaultValue:100}, // 공급가액의 끝 x좌표( 시작좌표가 아니다! )
        {name: 'money_tax_x',       type: 'int',    defaultValue:135}, // 세액의 끝 x좌표( 시작좌표가 아니다! )
        {name: 'money_box_width',   type: 'int',    defaultValue:4},   // 공급가액, 세액의 일십백천.... 각 한칸의 넓이
        
        // 목록
        {name: 'list_y',            type: 'int',    defaultValue:99},  // 상품목록의 y 
        {name: 'list_fs',           type: 'int',    defaultValue:7},   // 상품목록의 폰트크기 
        {name: 'list_lh',           type: 'int',    defaultValue:7},   // 상품목록의 글자간   
        {name: 'list_count',        type: 'int',    defaultValue:4},   // 상품목록의 출력가능 라인수
        
        {name: 'list_month_x',      type: 'int',    defaultValue:34},  // 월
        {name: 'list_day_x',        type: 'int',    defaultValue:43},  // 일
        
        {name: 'list_item_cd_x',    type: 'int',    defaultValue:0},   // 코드 x
        {name: 'list_item_nm_x',    type: 'int',    defaultValue:50},  // 품목 x  
        {name: 'list_unit_nm_x',    type: 'int',    defaultValue:92},  // 단위 x
        {name: 'list_qty_x',        type: 'int',    defaultValue:116}, // 수량 x
        {name: 'list_price_x',      type: 'int',    defaultValue:131}, // 단가 x
        {name: 'list_subtotal_x',   type: 'int',    defaultValue:151}, // 공급가액 x
        {name: 'list_tax_x',        type: 'int',    defaultValue:171}, // 세액 x
        
        // 합계 금액부분
        {name: 'total_amount_x',    type: 'int',    defaultValue:61},  // 합계금액 x  
        {name: 'total_amount_y',    type: 'int',    defaultValue:133}, // 합계금액 y
        {name: 'total_amount_fs',   type: 'int',    defaultValue:10},  // 합계금액 폰트크기
        
        // 하단의 공급 받는자 y좌표
        {name: 'bottom_recv_y',     type: 'int',    defaultValue:142}, 
        
        // 영수/청구 마크 표시좌표
        {name: 'pay_gb_x',           type: 'int', defaultValue:161},   // 영수/청구 마크 표시좌표 x
        {name: 'pay_gb1_y',          type: 'int', defaultValue:126},   // 영수/청구 마크 표시좌표 y (영수)
        {name: 'pay_gb2_y',          type: 'int', defaultValue:130},   // 영수/청구 마크 표시좌표 y (청구) 
        {name: 'pay_gb_fs',          type: 'int', defaultValue:8},     // 글자 크기 
        {name: 'pay_gb_textview_yn', type: 'boolean', defaultValue:false}, // 영수/청구 글씨만 표시( 영수와 청구 둘중 하나의 text만 쓰여진다(동그라미는 없다)
        
        // 하단의 form
        {name: 'page_count_x',      type: 'int',    defaultValue:160}, // 페이지수 x  
        {name: 'page_count_y',      type: 'int',    defaultValue:140}, // 페이지수 y
        {name: 'page_count_fs',     type: 'int',    defaultValue:8},   // 페이지수 폰트크기
        
        {name: 'barcode_x',         type: 'int',    defaultValue:145}, // 바코드 x
        {name: 'barcode_y',         type: 'int',    defaultValue:12},  // 바코드 y
        {name: 'barcode_width',     type: 'int',    defaultValue:30},  // 바코드 넓이 
        {name: 'barcode_height',    type: 'int',    defaultValue:10},  // 바코드 높이
        {name: 'barcode_yn',        type: 'boolean', defaultValue:false}, // 바코드 출력 y/n
        
        {name: 'advertisement_x',   type: 'int',    defaultValue:65},  // 광고문구 x  
        {name: 'advertisement_y',   type: 'int',    defaultValue:140}, // 광고문구 y  
        {name: 'advertisement_fs',  type: 'int',    defaultValue:7},   // 광고문구 폰트크기  
        {name: 'advertisement_content', type: 'string',    defaultValue:''}  // 광고문구 내용  
    ]
});
