/**
 * 거래명세서 출력 좌표
 */
Ext.define('Axt.popup.model.InvoiceSale', { extend:'Ext.data.Model', 
    fields:[
        // 상단
        {name: 'top_x',             type: 'int'},                     // x좌표 시작
        {name: 'top_y',             type: 'int'},                     // y좌표 시작   
        {name: 'send_biz_x',        type: 'int',    defaultValue:28}, // 공급자의 등록번호, 상호, 주소, 업태가 시작되는 x좌표
        
     // 직인 이미지 출력
        {name: 'stamp_yn',          type: 'boolean', defaultValue:false}, // 직인 이미지 출력
        
        {name: 'inv_dt_x',     type: 'int',    defaultValue:10},  // 일자x
        {name: 'inv_dt_y',     type: 'int',    defaultValue:15},  // 일자y   
        {name: 'inv_dt_fs',    type: 'int',    defaultValue:8},   // 일자 폰트크기   
        
// 공급자
        {name: 'send_biz_no_y',     type: 'int',    defaultValue:32}, // 등록번호 y   
        {name: 'send_biz_no_fs',    type: 'int',    defaultValue:12},  // 등록번호 폰트크기  
        
        {name: 'send_biz_tel_no_x', type: 'int',    defaultValue:20}, // 전화번호 x  
        {name: 'send_biz_tel_no_y', type: 'int',    defaultValue:142}, // 전화번호 y  
        {name: 'send_biz_tel_no_fs',type: 'int',    defaultValue:8},  // 전화번호 폰트크기  
        {name: 'send_biz_fax_no_x', type: 'int',    defaultValue:0}, // fax x  
        {name: 'send_biz_fax_no_y', type: 'int',    defaultValue:0}, // fax y  
        {name: 'send_biz_fax_no_fs',type: 'int',    defaultValue:8},  // fax 폰트크기  
        
        {name: 'send_biz_nm_y',     type: 'int',    defaultValue:40}, // 상호 y  
        {name: 'send_biz_nm_fs',    type: 'int',    defaultValue:8},  // 상호 폰트크기  
        {name: 'send_biz_owner_x',  type: 'int',    defaultValue:70}, // 성명 x  
        {name: 'send_biz_owner_fs', type: 'int',    defaultValue:8},  // 성명 폰트크기  
        {name: 'send_biz_addr_y',   type: 'int',    defaultValue:47}, // 주소 y  
        {name: 'send_biz_addr_fs',  type: 'int',    defaultValue:8},  // 주소 폰트크기
        {name: 'send_biz_addr_lh',  type: 'int',    defaultValue:4},  // 주소 줄간격
        {name: 'send_biz_cond_y',   type: 'int',    defaultValue:58}, // 업태 y 
        {name: 'send_biz_cond_fs',  type: 'int',    defaultValue:8},  // 업태 폰트크기 
        {name: 'send_biz_types_x',  type: 'int',    defaultValue:67}, // 종목 x
        {name: 'send_biz_types_fs', type: 'int',    defaultValue:8},  // 종목 폰트크기
        
// 공급받는자
        {name: 'recv_biz_x',        type: 'int',    defaultValue:105}, // 등록번호 (공급받는자x)

        {name: 'recv_biz_tel_no_x', type: 'int',    defaultValue:0}, // 전화번호 x  
        {name: 'recv_biz_fax_no_x', type: 'int',    defaultValue:0}, // fax x  
        
        {name: 'recv_biz_owner_x',  type: 'int',    defaultValue:142}, // 성명
        {name: 'recv_biz_types_x',  type: 'int',    defaultValue:142}, // 종목
        
        // 공급가액/세액
        {name: 'money_year_x',      type: 'int',    defaultValue:0},  // 년 x
        {name: 'money_month_x',     type: 'int',    defaultValue:0},  // 월 x
        {name: 'money_day_x',       type: 'int',    defaultValue:0},  // 일 x
        {name: 'money_empty_x',     type: 'int',    defaultValue:0},  // 공란수 x
        
        {name: 'money_y',           type: 'int',    defaultValue:0},   // 공급가액, 세액 부분의 y
        {name: 'money_fs',          type: 'int',    defaultValue:0},   // 공급가액, 세액 부분의 폰트크기
        {name: 'money_subtotal_x',  type: 'int',    defaultValue:0},   // 공급가액의 끝 x좌표( 시작좌표가 아니다! )
        {name: 'money_tax_x',       type: 'int',    defaultValue:0},   // 세액의 끝 x좌표( 시작좌표가 아니다! )
        {name: 'money_box_width',   type: 'int',    defaultValue:0},   // 공급가액, 세액의 일십백천.... 각 한칸의 넓이
 
// 우측 거래처코드, 전표NO, 합계금액
        {name: 'cust_id_x',   type: 'int',    defaultValue:176}, // 거래처코드
        {name: 'cust_id_y',   type: 'int',    defaultValue:32},  //   
        {name: 'cust_id_fs',  type: 'int',    defaultValue:9},  //  
        
        {name: 'work_no_x',   type: 'int',    defaultValue:176}, // 전표NO.  
        {name: 'work_no_y',   type: 'int',    defaultValue:40},  //   
        {name: 'work_no_fs',  type: 'int',    defaultValue:9},  //  
        
        {name: 'amount1_x',   type: 'int',    defaultValue:176}, // 합계금액
        {name: 'amount1_y',   type: 'int',    defaultValue:56},  //   
        {name: 'amount1_fs',  type: 'int',    defaultValue:9},  // 
        
// 목록
        
        {name: 'list_y',            type: 'int',    defaultValue:73},  // 상품목록의 y 
        {name: 'list_fs',           type: 'int',    defaultValue:8},   // 상품목록의 폰트크기 
        {name: 'list_lh',           type: 'int',    defaultValue:4},   // 상품목록의 글자간   
        {name: 'list_count',        type: 'int',    defaultValue:11},  // 상품목록의 출력가능 라인수
        
        {name: 'list_month_x',      type: 'int',    defaultValue:0},  // 월
        {name: 'list_day_x',        type: 'int',    defaultValue:0},  // 일
        
        {name: 'list_codebarcode',  type: 'int',    defaultValue:0},  // 상품목록의 앞쪽에 code로 출력할지 바코드로 출력할지 결정 (0:코드, 1:바코드) 

        {name: 'list_item_cd_x',    type: 'int',    defaultValue:10},  // 코드 x
        {name: 'list_item_nm_x',    type: 'int',    defaultValue:36},  // 품목 x  
        {name: 'list_unit_nm_x',    type: 'int',    defaultValue:92},  // 단위 x
        {name: 'list_qty_x',        type: 'int',    defaultValue:108}, // 수량 x
        {name: 'list_price_x',      type: 'int',    defaultValue:127}, // 단가 x
        {name: 'list_subtotal_x',   type: 'int',    defaultValue:0},   // 공급가액 x
        {name: 'list_amount_x',   	type: 'int',    defaultValue:152}, // 합계 x
        {name: 'list_tax_x',        type: 'int',    defaultValue:0},   // 세액 x
        {name: 'list_sobi_price_x', type: 'int',    defaultValue:177}, // 소비자가
        
// 합계 금액부분
        {name: 'total_amount_x',    type: 'int',    defaultValue:85},  // 합계금액 x  
        {name: 'total_amount_y',    type: 'int',    defaultValue:135}, // 합계금액 y
        {name: 'total_amount_fs',   type: 'int',    defaultValue:10},  // 합계금액 폰트크기
        
        {name: 'pre_balance_x',     type: 'int',    defaultValue:45},  // 전일미수
        {name: 'pre_balance_y',     type: 'int',    defaultValue:135}, //   
        {name: 'pre_balance_fs',    type: 'int',    defaultValue:10},  //  
        
        {name: 'balance_x',         type: 'int',    defaultValue:140},  // 현미수 (미수누계)
        {name: 'balance_y',         type: 'int',    defaultValue:135}, //   
        {name: 'balance_fs',        type: 'int',    defaultValue:10},  //  
        
// 하단의 공급 받는자 y좌표
        {name: 'bottom_recv_y',     type: 'int',    defaultValue:148}, 
        
// 하단의 form
        {name: 'page_count_x',      type: 'int',    defaultValue:160}, // 페이지수 x  
        {name: 'page_count_y',      type: 'int',    defaultValue:142}, // 페이지수 y
        {name: 'page_count_fs',     type: 'int',    defaultValue:7},   // 페이지수 폰트크기
        
        {name: 'barcode_x',         type: 'int',    defaultValue:65},  // 바코드 x
        {name: 'barcode_y',         type: 'int',    defaultValue:18},  // 바코드 y
        {name: 'barcode_width',     type: 'int',    defaultValue:45},  // 바코드 넓이 
        {name: 'barcode_height',    type: 'int',    defaultValue:10},  // 바코드 높이
        {name: 'barcode_yn',        type: 'boolean', defaultValue:true}, // 바코드 출력 y/n
        
        {name: 'advertisement_x',   type: 'int',    defaultValue:28},  // 광고문구 x  
        {name: 'advertisement_y',   type: 'int',    defaultValue:130}, // 광고문구 y  
        {name: 'advertisement_fs',  type: 'int',    defaultValue:0},  // 광고문구 폰트크기  
        {name: 'advertisement_content', type: 'string',    defaultValue:'테스트 공지 사항입니다.'}  // 광고문구 내용
        
    ]
});
