/**
 * 택배송장 출력 좌표
 */
Ext.define('Axt.popup.model.InvoiceDeliveryCJ', { extend:'Ext.data.Model', 
    fields:[
        // 상단
        {name: 'top_x',             type: 'int'},                     // x좌표 시작
        {name: 'top_y',             type: 'int'},                     // y좌표 시작   
        
// 택배용지 좌측 고객용 (택배용지 좌측)
        // 운송장번호
        {name: 'l_taekbae_no_x', type: 'int',    defaultValue:35},
        {name: 'l_taekbae_no_y', type: 'int',    defaultValue:8},
        {name: 'l_taekbae_no_fs',type: 'int',    defaultValue:10},

        // 바코드 (TML)
        {name: 'l_taekbae_tml_barcode_x',         type: 'int',    defaultValue:5}, // 바코드 x
        {name: 'l_taekbae_tml_barcode_y',         type: 'int',    defaultValue:11}, // 바코드 y
        {name: 'l_taekbae_tml_barcode_width',     type: 'int',    defaultValue:35}, // 바코드 넓이 
        {name: 'l_taekbae_tml_barcode_height',    type: 'int',    defaultValue:10}, // 바코드 높이
        // TML
        {name: 'l_taekbae_tml_x',type: 'int',    defaultValue:45},
        {name: 'l_taekbae_tml_y',type: 'int',    defaultValue:25},   
        {name: 'l_taekbae_tml_fs',type: 'int',   defaultValue:30},
        {name: 'l_taekbae_tml2_x',type: 'int',   defaultValue:51},
        {name: 'l_taekbae_tml2_y',type: 'int',   defaultValue:25},   
        {name: 'l_taekbae_tml2_fs',type: 'int',  defaultValue:45},
        {name: 'l_taekbae_tml3_x',type: 'int',   defaultValue:80},
        {name: 'l_taekbae_tml3_y',type: 'int',   defaultValue:25},   
        {name: 'l_taekbae_tml3_fs',type: 'int',  defaultValue:30},
        
        // 받는분 주소 (주소1 + 주소2)
        {name: 'l_rcv_biz_addr_x',type: 'int',    defaultValue:8},
        {name: 'l_rcv_biz_addr_y',type: 'int',    defaultValue:36},
        {name: 'l_rcv_biz_addr_fs',type: 'int',    defaultValue:8},
        {name: 'l_rcv_biz_addr_lh',type: 'int',    defaultValue:4},
        // 받는분 이름 
        {name: 'l_rcv_biz_nm_x',type: 'int',    defaultValue:8},    
        {name: 'l_rcv_biz_nm_y',type: 'int',    defaultValue:32},
        {name: 'l_rcv_biz_nm_fs',type: 'int',    defaultValue:8},
        // 받는분 전화번호
        {name: 'l_rcv_tel_no_x',type: 'int',    defaultValue:73},
        {name: 'l_rcv_tel_no_y',type: 'int',    defaultValue:33},
        {name: 'l_rcv_tel_no_fs',type: 'int',    defaultValue:8},
        // 받는분 핸드폰번호
        {name: 'l_rcv_tel_hp_x',type: 'int',    defaultValue:73},
        {name: 'l_rcv_tel_hp_y',type: 'int',    defaultValue:36},
        {name: 'l_rcv_tel_hp_fs',type: 'int',    defaultValue:8},
        
        // 보내는분 주소 (주소1 + 주소2)
        {name: 'l_snd_biz_addr_x',type: 'int',    defaultValue:8},
        {name: 'l_snd_biz_addr_y',type: 'int',    defaultValue:48},
        {name: 'l_snd_biz_addr_fs',type: 'int',    defaultValue:8},
        {name: 'l_snd_biz_addr_lh',type: 'int',    defaultValue:4},
        // 보내는분 이름 
        {name: 'l_snd_biz_nm_x',type: 'int',    defaultValue:8},    
        {name: 'l_snd_biz_nm_y',type: 'int',    defaultValue:45},
        {name: 'l_snd_biz_nm_fs',type: 'int',    defaultValue:8},
        // 보내는분 전화번호
        {name: 'l_snd_tel_no_x',type: 'int',    defaultValue:0},
        {name: 'l_snd_tel_no_y',type: 'int',    defaultValue:0},
        {name: 'l_snd_tel_no_fs',type: 'int',    defaultValue:0},
        // 운임
        {name: 'l_fare_type_x',type: 'int',    defaultValue:85},  // 운임 x
        {name: 'l_fare_type_y',type: 'int',    defaultValue:45},  // 운임 y   
        {name: 'l_fare_type_fs',type: 'int',    defaultValue:8}, // 운임 fs
        // 박스수량 (박스구분 + 수량)
        {name: 'l_box_count_x',type: 'int',    defaultValue:85},  // 박스수량 x
        {name: 'l_box_count_y',type: 'int',    defaultValue:53},  // 박스수량 y   (x는 운임쪽의 x좌표로 공통
        {name: 'l_box_count_fs',type: 'int',    defaultValue:8}, // 박스수량 fs

        // 매출번호
        {name: 'l_inv_no_x',type: 'int',    defaultValue:70},  // 매출번호 x
        {name: 'l_inv_no_y',type: 'int',    defaultValue:62},  // 매출번호 y   (x는 운임쪽의 x좌표로 공통
        {name: 'l_inv_no_fs',type: 'int',    defaultValue:8}, // 매출번호 fs
        
        // 품명
        {name: 'l_item_nm_x',type: 'int',    defaultValue:8},  // 
        {name: 'l_item_nm_y',type: 'int',    defaultValue:60}, //   
        {name: 'l_item_nm_fs',type: 'int',    defaultValue:10}, //

        // 품목 수량
        {name: 'l_qty_x',type: 'int',    defaultValue:60},  // 
        {name: 'l_qty_y',type: 'int',    defaultValue:60}, //   
        {name: 'l_qty_fs',type: 'int',    defaultValue:10}, //
        
        // 바코드 (운송장번호)
        {name: 'l_taekbae_no_barcode_x',         type: 'int',    defaultValue:5}, // 바코드 x
        {name: 'l_taekbae_no_barcode_y',         type: 'int',    defaultValue:85}, // 바코드 y
        {name: 'l_taekbae_no_barcode_width',     type: 'int',    defaultValue:40}, // 바코드 넓이 
        {name: 'l_taekbae_no_barcode_height',    type: 'int',    defaultValue:15}, // 바코드 높이
        
// 택배용지 우측상단 택배 회사용 (택배용지 우측) 시작
        // 운송장번호
        {name: 'ru_taekbae_no_x', type: 'int',    defaultValue:133},
        {name: 'ru_taekbae_no_y', type: 'int',    defaultValue:8},
        {name: 'ru_taekbae_no_fs',type: 'int',    defaultValue:10},
        // 받는분 주소 (주소1 + 주소2) 11.5 1.2
        {name: 'ru_rcv_biz_addr_x',type: 'int',    defaultValue:115},
        {name: 'ru_rcv_biz_addr_y',type: 'int',    defaultValue:18},
        {name: 'ru_rcv_biz_addr_fs',type: 'int',    defaultValue:8},
        {name: 'ru_rcv_biz_addr_lh',type: 'int',    defaultValue:4},
        // 받는분 이름 
        {name: 'ru_rcv_biz_nm_x',type: 'int',    defaultValue:115},    
        {name: 'ru_rcv_biz_nm_y',type: 'int',    defaultValue:13},
        {name: 'ru_rcv_biz_nm_fs',type: 'int',    defaultValue:8},
        // 받는분 전화번호
        {name: 'ru_rcv_tel_no_x',type: 'int',    defaultValue:173},
        {name: 'ru_rcv_tel_no_y',type: 'int',    defaultValue:13},
        {name: 'ru_rcv_tel_no_fs',type: 'int',    defaultValue:8},
        // 받는분 핸드폰번호
        {name: 'ru_rcv_tel_hp_x',type: 'int',    defaultValue:173},
        {name: 'ru_rcv_tel_hp_y',type: 'int',    defaultValue:18},
        {name: 'ru_rcv_tel_hp_fs',type: 'int',    defaultValue:8},
        // 품명
        {name: 'ru_item_nm_x',type: 'int',    defaultValue:115}, 
        {name: 'ru_item_nm_y',type: 'int',    defaultValue:28},    
        {name: 'ru_item_nm_fs',type: 'int',    defaultValue:8}, 
        // 운임
        {name: 'ru_fare_type_x',type: 'int',    defaultValue:174},
        {name: 'ru_fare_type_y',type: 'int',    defaultValue:28},    
        {name: 'ru_fare_type_fs',type: 'int',    defaultValue:8},
// 택배용지 우측상단 택배 회사용 (택배용지 우측) 끝
        
        
// 택배용지 우측하단 택배 회사용 (택배용지 우측) 시작
        // 받는분 주소 (주소1 + 주소2)
        {name: 'rd_rcv_biz_addr_x',type: 'int',    defaultValue:105},
        {name: 'rd_rcv_biz_addr_y',type: 'int',    defaultValue:38},
        {name: 'rd_rcv_biz_addr_fs',type: 'int',    defaultValue:8},
        {name: 'rd_rcv_biz_addr_lh',type: 'int',    defaultValue:4},
        // 받는분 이름 
        {name: 'rd_rcv_biz_nm_x',type: 'int',    defaultValue:115},    
        {name: 'rd_rcv_biz_nm_y',type: 'int',    defaultValue:33},
        {name: 'rd_rcv_biz_nm_fs',type: 'int',    defaultValue:8},
        // 받는분 전화번호
        {name: 'rd_rcv_tel_no_x',type: 'int',    defaultValue:173},
        {name: 'rd_rcv_tel_no_y',type: 'int',    defaultValue:33},
        {name: 'rd_rcv_tel_no_fs',type: 'int',    defaultValue:8},
        // 받는분 핸드폰번호
        {name: 'rd_rcv_tel_hp_x',type: 'int',    defaultValue:173},
        {name: 'rd_rcv_tel_hp_y',type: 'int',    defaultValue:36},
        {name: 'rd_rcv_tel_hp_fs',type: 'int',    defaultValue:8},

        // 보내는분 주소 (주소1 + 주소2)
        {name: 'rd_snd_biz_addr_x',type: 'int',    defaultValue:103},
        {name: 'rd_snd_biz_addr_y',type: 'int',    defaultValue:56},
        {name: 'rd_snd_biz_addr_fs',type: 'int',    defaultValue:8},
        {name: 'rd_snd_biz_addr_lh',type: 'int',    defaultValue:4},
        // 보내는분 이름 
        {name: 'rd_snd_biz_nm_x',type: 'int',    defaultValue:115},    
        {name: 'rd_snd_biz_nm_y',type: 'int',    defaultValue:51},
        {name: 'rd_snd_biz_nm_fs',type: 'int',    defaultValue:8},
        // 보내는분 전화번호
        {name: 'rd_snd_tel_no_x',type: 'int',    defaultValue:147},
        {name: 'rd_snd_tel_no_y',type: 'int',    defaultValue:51},
        {name: 'rd_snd_tel_no_fs',type: 'int',    defaultValue:8},
        
        // 품목 정보
        {name: 'rd_item_nm_x',    type: 'int',    defaultValue:103},
        {name: 'rd_item_nm_y',    type: 'int',    defaultValue:74},
        {name: 'rd_item_nm_fs',    type: 'int',    defaultValue:8},

        // 매출날짜
        {name: 'rd_inv_dt_x',    type: 'int',    defaultValue:103},
        {name: 'rd_inv_dt_y',    type: 'int',    defaultValue:83},
        {name: 'rd_inv_dt_fs',    type: 'int',    defaultValue:8},
        
        // 배송지주소약칭
        {name: 'rd_taekbae_znm_x',    type: 'int',    defaultValue:105},
        {name: 'rd_taekbae_znm_y',    type: 'int',    defaultValue:90},
        {name: 'rd_taekbae_znm_fs',    type: 'int',    defaultValue:15},
        // 배송대리점명
        {name: 'rd_taekbae_did_x',    type: 'int',    defaultValue:96},
        {name: 'rd_taekbae_did_y',    type: 'int',    defaultValue:96},
        {name: 'rd_taekbae_did_fs',    type: 'int',    defaultValue:15},
        // 집배사원(배달사원)
        {name: 'rd_taekbae_pnm_x',    type: 'int',    defaultValue:0},
        {name: 'rd_taekbae_pnm_y',    type: 'int',    defaultValue:0},
        {name: 'rd_taekbae_pnm_fs',    type: 'int',    defaultValue:0},
        
        // 운임
        {name: 'rd_fare_type_x',type: 'int',    defaultValue:183},  // 운임 x
        {name: 'rd_fare_type_y',type: 'int',    defaultValue:52},  // 운임 y   
        {name: 'rd_fare_type_fs',type: 'int',    defaultValue:8}, // 운임 fs
        // 박스수량 (박스구분 + 수량)
        {name: 'rd_box_count_x',type: 'int',    defaultValue:183},  // 박스수량 x
        {name: 'rd_box_count_y',type: 'int',    defaultValue:64},  // 박스수량 y   (x는 운임쪽의 x좌표로 공통
        {name: 'rd_box_count_fs',type: 'int',    defaultValue:8}, // 박스수량 fs
        
        // 바코드 (운송장번호)
        {name: 'rd_taekbae_no_barcode_x',         type: 'int',    defaultValue:150}, // 바코드 x
        {name: 'rd_taekbae_no_barcode_y',         type: 'int',    defaultValue:85}, // 바코드 y
        {name: 'rd_taekbae_no_barcode_width',     type: 'int',    defaultValue:40}, // 바코드 넓이 
        {name: 'rd_taekbae_no_barcode_height',    type: 'int',    defaultValue:15}  // 바코드 높이
// 택배용지 우측하단 택배 회사용 (택배용지 우측) 끝
        
    ]
});
