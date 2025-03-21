
Ext.define('module.project.storeinfo.view.StoreInfoUpload', { extend: 'Axt.popup.Search',
    alias: 'widget.module-storeinfo-upload',

    closable: true,
    width: 800,
    height: 460,
    autoShow: true,
    title   : '엑셀 붙여넣기',
    layout: 'border',

    initComponent: function(config){
        var me = this;
//        me.dockedItems = [ me.createToolbar() ],
        me.items = [ me.createGrid() ];
        me.callParent(arguments);
    },

    /**
     * 상품리스트
     * @return {Ext.grid.Panel} 상품리스트 그리드
     */
    createGrid: function(){
    	var grid = Ext.create('Axt.grid.Excel' , {   // new com.common.grid.Excel({
            region: 'center',
            store: this.gridStore || {
			    fields:[
				            'hq_id',  'stor_grp',  'stor_id'
				          , 'biz_nm'  , 'biz_no',  'biz_type',  'biz_kind',  'biz_owner'
				          , 'biz_tel_no', 'biz_fax_no',  'biz_hp_no'  , 'biz_email'
				          , 'biz_zip_cd',  'biz_state',  'biz_city',  'biz_dong' , 'biz_addr_2'
				          , '_result' , '_status'
				],
			    data:[ {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{} ]
            },
            paging:
        	{
        		xtype: 'grid-paging', pagingButton : false,
        		items:[
        		 	'->' ,
                    {text: Const.CANCEL.text, iconCls: Const.CANCEL.icon , scope: this, handler: this.cancelAction , cls: 'button_style'}, /* 취소 */
                    {text: Const.FINISH.text, iconCls: Const.FINISH.icon , scope: this, handler: this.confirmAction, cls: 'button_style' },
                    {text: Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: this, handler: this.close        , cls: 'button_style' }
        		]
        	},
		    columns: this.gridColumns || {
		    	items: [
		    		{header: '본사ID'	  , dataIndex: 'hq_id'	, width : 100 , editor: 'textfield'},
		    		{header: '사업장GP'    , dataIndex: 'stor_grp'	, width : 100 , editor: 'textfield'},
		    		{header: '사업장ID'    , dataIndex: 'stor_id'	, width : 100 , editor: 'textfield'} ,
		    		{header: '사업장명'    , dataIndex: 'biz_nm'	 , width : 100    , editor: 'textfield'} ,
		    		{header: '사업자번호' , dataIndex: 'biz_no'	  , width : 100   , editor: 'textfield'} ,
		    		{header: '업태'      , dataIndex: 'biz_type'	  , width : 100   , editor: 'textfield'} ,
		    		{header: '업종'      , dataIndex: 'biz_kind'	  , width : 100   , editor: 'textfield'} ,
		    		{header: '대표자'    ,  dataIndex: 'biz_owner'	  , width : 100   , editor: 'textfield'} ,
		    		{header: '전화번호'  , dataIndex: 'biz_tel_no'	, width : 100     , editor: 'textfield'} ,
		    		{header: '팩스번호'  , dataIndex: 'biz_fax_no'	, width : 100     , editor: 'textfield'} ,
		    		{header: '휴대전화'  , dataIndex: 'biz_hp_no'	, width : 100     , editor: 'textfield'} ,
		    		{header: '전자메일'  , dataIndex: 'biz_email'	, width : 100     , editor: 'textfield'} ,
		    		{header: '우편번호'  , dataIndex: 'biz_zip_cd'	, width : 100     , editor: 'textfield'} ,
		    		{header: '시/도'    , dataIndex: 'biz_state'	   , width : 100  , editor: 'textfield'} ,
		    		{header: '군/구'    , dataIndex: 'biz_city'	   , width : 100 , editor: 'textfield'} ,
		    		{header: '읍/면동'  , dataIndex: 'biz_dong'	    , width : 100, editor: 'textfield'} ,
		    		{header: '상세주소' , dataIndex: 'biz_addr_2'	 , width : 200   , editor: 'textfield'} ,
		    		{header: '결과'		, dataIndex: '_result' , width : 300 	, editor: 'textfield'}
	    		]
			}
        });
        return grid;
    },

    /**
     * 취소 - 데이터 초기화
     */
    cancelAction: function(){
    	var me = this,
    	lister = me.down('grid')
    	;
    	lister.getStore().clearData();
    	lister.getStore().loadData([{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{} ],false);
    },

    /**
     * 확인 버튼 이벤트
     * 분류4의 선택 값이 있을 경우에만 반환
     */
    confirmAction: function(){
    	var me = this,
            lister = this.down('grid'),
            store = lister.getStore(),
            updated = store.getUpdatedRecords(),
            added = store.getNewRecords(),
            records = updated.concat(added),
            success_cnt   = 0 ,
            failure_cnt   = 0
         ;
    	store.each( function( record ){
       		if (Ext.isEmpty(record.data.hq_id) || record.data.hq_id == '' || record.data.hq_id.length != 10 ) {
       			record.dirtyValue('_status', '0'  );
       			record.dirtyValue('_result', '<font color=red>올바르지 않은 본사 ID</font>'  );
       			failure_cnt = failure_cnt + 1 ;
       		} else
       		if (Ext.isEmpty(record.data.stor_grp) || record.data.stor_grp == '' || record.data.stor_grp.length != 14 ) {
       			record.dirtyValue('_status', '0'  );
       			record.dirtyValue('_result', '<font color=red>올바르지 않은 사업장GP</font>'  );
       			failure_cnt = failure_cnt + 1 ;
       		} else
       		if (Ext.isEmpty(record.data.stor_id) || record.data.stor_id == '' || record.data.stor_id.length != 14 ) {
       			record.dirtyValue('_status', '0'  );
       			record.dirtyValue('_result', '<font color=red>올바르지 않은 사업장ID</font>'  );
       			failure_cnt = failure_cnt + 1 ;
       		} else {
				Ext.Ajax.request({
					url: _global.location.http() + '/recv/recvwork/get/product/excel.do', //'/system/basic/sequence/get/default.do',
					params: { token : _global.token_id, param : JSON.stringify({ stor_id : _global.stor_id , item_code : Ext.String.trim( item.data._barcode ) }) } ,
					method:'POST',
					async: false,
					success:function(response, request){
						var result = Ext.decode(response.responseText);
						var records = result.records ;
						if ( records && records.length > 0  ){ /* 품목코드 조회 성공 */
							if ( records.length == 1  ){ /* 1건 조회인 경우 */
								var record = records[0];
								if ( item.data.price == 0 ){ /* 입력 단가가 0이면 조회결과의 cust_price 입력 */
									item.dirtyValue('cust_price', record.po_pri );
								} else {
									item.dirtyValue('cust_price', item.data.price );
								}

//							item.data._confirm = '조회 성공';
//							item.data._sts     = '1' ;
							item.dirtyValue('_confirm', '조회 성공' );
							item.dirtyValue('_sts'	  , '1' );
							success_cnt = success_cnt + 1 ;

//							item.dirtyValue('mst_itm_id'	  	, record.mst_itm_id 		);
//							item.dirtyValue('mst_itm_cd'	  	, record.mst_itm_cd 		);
							item.dirtyValue('barcode'	  	, record.barcode 		);
							item.dirtyValue('item_idcd'	  	, record.item_idcd 		);
							item.dirtyValue('item_code'	  	, record.item_code 		);
							item.dirtyValue('item_name'	  	, record.item_name 		);
							item.dirtyValue('item_ds'	  	, record.item_ds 		);
							item.dirtyValue('item_spec'	  	, record.item_spec 		);
							item.dirtyValue('unit_idcd'	  	, record.unit_idcd 		);
							item.dirtyValue('unit_name'	  	, record.unit_name 		);
							item.dirtyValue('unt_qty'	  	, record.unt_qty 		);
							item.dirtyValue('stk_itm_id'	  	, record.stk_itm_id 		);
							item.dirtyValue('notax_yn'	  	, record.notax_yn 		);
							item.dirtyValue('cst_pri'	, record.cst_pri 	);
//							item.dirtyValue('cust_price'	, record.cust_price		);
							item.dirtyValue('class_nm'	  	, record.class_nm 		);
							item.dirtyValue('brand_id'	  	, record.brand_id 		);
							item.dirtyValue('brand_nm'	  	, record.brand_nm 		);
							item.dirtyValue('mfg_id'	  	, record.mfg_id 		);
							item.dirtyValue('mfg_nm'	  	, record.mfg_nm 		);
							item.dirtyValue('po_pri'	  	, record.po_pri 		);
							item.dirtyValue('po_pri_type'	, record.po_pri_type 	);
							item.dirtyValue('po_pri_rt'	, record.po_pri_rt 	);
							item.dirtyValue('pack_zone_id'	, record.pack_zone_id );
							item.dirtyValue('pack_zone_nm'	, record.pack_zone_nm );
							item.dirtyValue('sales_id'	  	, record.sales_id );
							item.dirtyValue('sales_nm'	  	, record.sales_nm );

						}  else if ( records.length > 1  ){
							var eachCnt = 0 ;
							var eachRecord = undefined ;
							records.forEach( function( searchItem ){
//								console.debug('searchItem',  searchItem );
								if ( searchItem.item_code == item.data._barcode ){
									eachCnt = eachCnt + 1 ;
									eachRecord = searchItem ;
									return;
								}
							});
							if ( eachCnt == 1 ){ /* 입력한 코드와 일치하는 item_cd가 있으면 */
								var record 		= eachRecord;
									eachRecord	= undefined ;
								if ( item.data.price == 0 ){ /* 입력 단가가 0이면 조회결과의 cust_price 입력 */
//    								console.debug('cust_price 단가 입력' );
//    								item.data.price = record.cust_price ;
    									item.dirtyValue('cust_price', record.po_pri );
    								} else {
    									item.dirtyValue('cust_price', item.data.price );
    								}

//    								item.data._confirm = '조회 성공';
//    								item.data._sts     = '1' ;
    								item.dirtyValue('_confirm', '조회 성공' );
    								item.dirtyValue('_sts'	  , '1' );
    								success_cnt = success_cnt + 1 ;

//    								item.dirtyValue('mst_itm_id'	  	, record.mst_itm_id 		);
//    								item.dirtyValue('mst_itm_cd'	  	, record.mst_itm_cd 		);
    								item.dirtyValue('barcode'	  	, record.barcode 		);
    								item.dirtyValue('item_idcd'	  	, record.item_idcd 		);
    								item.dirtyValue('item_code'	  	, record.item_code 		);
    								item.dirtyValue('item_name'	  	, record.item_name 		);
    								item.dirtyValue('item_ds'	  	, record.item_ds 		);
    								item.dirtyValue('item_spec'	  	, record.item_spec 		);
    								item.dirtyValue('unit_idcd'	  	, record.unit_idcd 		);
    								item.dirtyValue('unit_name'	  	, record.unit_name 		);
    								item.dirtyValue('unt_qty'	  	, record.unt_qty 		);
    								item.dirtyValue('stk_itm_id'	  	, record.stk_itm_id 		);
    								item.dirtyValue('notax_yn'	  	, record.notax_yn 		);
//    								item.dirtyValue('cust_price'	, record.cust_price		);
    								item.dirtyValue('class_nm'	  	, record.class_nm 		);
    								item.dirtyValue('brand_id'	  	, record.brand_id 		);
    								item.dirtyValue('brand_nm'	  	, record.brand_nm 		);
    								item.dirtyValue('mfg_id'	  	, record.mfg_id 		);
    								item.dirtyValue('mfg_nm'	  	, record.mfg_nm 		);
    								item.dirtyValue('cst_pri'	, record.cst_pri 	);

    								item.dirtyValue('po_pri'	  	, record.po_pri 		);
    								item.dirtyValue('po_pri_type'	, record.po_pri_type 	);
    								item.dirtyValue('po_pri_rt'	, record.po_pri_rt 	);
    								item.dirtyValue('pack_zone_id'	, record.pack_zone_id );
    								item.dirtyValue('pack_zone_nm'	, record.pack_zone_nm );
    								item.dirtyValue('sales_id'	  	, record.sales_id );
    								item.dirtyValue('sales_nm'	  	, record.sales_nm );
							} else {
    							item.dirtyValue( '_confirm', '<font color=red>다중 코드</font>' );
    							item.dirtyValue( '_sts', '0' );
    							failure_cnt = failure_cnt + 1 ;

							}

						}

					} else { /* 품목코드 조회 실패 */
						item.dirtyValue( '_confirm', '<font color=red>조회 실패</font>' );
						item.dirtyValue( '_sts', '0' );
						failure_cnt = failure_cnt + 1 ;
					}
				}
			});


       		}
    	});
    	lister.getView().refresh();
    	if (failure_cnt>0) {
    		Ext.Msg.alert({ title: '알림', msg: "성공: "+success_cnt+"건 / <font color=red>실패 : "+failure_cnt+"건</font>의 오류가 있습니다.", scope: me });
    	}
    },

	listeners: {
		render: function(){
			var me = this;
			new Ext.util.KeyMap({
			        target  : me.getEl().dom,
			        binding : [
			     	/* Ctrl + Delete */
			     	    {
			     		    ctrl:true, key: 46,
				     		fn: function(key,e){
				     			var records = me.down('grid').getSelectionModel().getSelection();

				     			if (Ext.isEmpty( records[0] )) {
	     	 						Ext.Msg.alert("알림", "상품을 선택해주시기 바랍니다.");
	     	 						return;
				     			}
				     	 		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				     	 			fn : function (button) {
				     	 				if (button==='yes') {
				     	 					var store = me.down('grid').getStore();
				     	 					store.remove(records[0]);
				     	 				}
				     	 			}
			     	    		});
			     			}
			     	    }
			     	]
			});
		}
	}

});


