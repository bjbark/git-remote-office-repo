Ext.define('module.sale.salework.SaleWork', { extend : 'Axt.app.Controller',

	requires: [
	 	'lookup.popup.cust.CustPopup',
  		'lookup.popup.item.ItemPopup',
	 	'lookup.popup.view.MembPopup',
		'lookup.popup.view.StorePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.DeptPopup',
	    'Axt.popup.view.ZipcodeSearch',
		'module.sale.salework.view.SaleWorkExcel',
		'system.popup.view.PriceChangePopup'
	],

	models: [
		'module.sale.salework.model.SaleWorkInvoice',
		'module.sale.salework.model.SaleWorkMaster',
		'module.sale.salework.model.SaleWorkDetail',
		'module.sale.salework.model.SaleWorkPayment'
	],

	stores: [
		'module.sale.salework.store.SaleWorkInvoice',
		'module.sale.salework.store.SaleWorkMaster',
		'module.sale.salework.store.SaleWorkDetail',
		'module.sale.salework.store.SaleWorkPayment'
	],

	views : [
	    'module.sale.salework.view.SaleWorkLayout',
	    'module.sale.salework.view.SaleWorkListerMaster',
	    'module.sale.salework.view.SaleWorkListerDetail',
	    'module.sale.salework.view.SaleWorkListerPayment',
	    'module.sale.salework.view.SaleWorkSearch',
	    'module.sale.salework.view.SaleWorkWorkerEditor',
	    'module.sale.salework.view.SaleWorkWorkerLister',
	    'module.sale.salework.view.SaleWorkWorkerSearch',
		'module.sale.salework.view.SaleWorkExcel'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-salework-lister-master button[action=invPrintAction]'),  Const.PERMIT.REPORT);
		this.joinPermission(workspace.down('module-salework-lister-master button[action=closeAction]'), Const.PERMIT.MODIFY );
	},

	init: function() {
		var me = this;
		me.control({
			'module-salework-layout #itempanel'                  : { tabchange : me.itemTabChange },
			'module-salework-layout	button[action=selectAction]' : { click : me.selectAction }, /* 조회 */

			'module-salework-lister-master menuitem[action=closeActiveAction]' : { click : me.closeAction   }, /* 마감 */
			'module-salework-lister-master menuitem[action=closeCancelAction]' : { click : me.closeAction   }, /* 마감취소 */


			'module-salework-lister-master button[action=invPrintAction]' : { click : me.invReportAction }, /* 거래명세서 발행 */
			'module-salework-lister-master button[action=modifyAction]' : { click : me.modifyAction }, /* 수정 */
			'module-salework-lister-master button[action=insertAction]' : { click : me.insertAction }, /* 등록 */
			'module-salework-lister-master button[action=exportAction]' : { click : me.exportAction }, /* 엑셀 */
			'module-salework-lister-master button[action=deleteAction]' : { click : me.deleteAction }, /* 삭제 */
			'module-salework-lister-detail button[action=exportAction]' : { click : me.exportDetailAction }, /* 엑셀 */

			'module-salework-worker-lister button[action=ExcelPaste]'  : { click : me.ExcelPaste  }, /* 엑셀 붙여넣기 */
			'module-salework-worker-lister button[action=PriceChange]' : { click : me.PriceChange }, /* 가격 변경 */

			'module-salework-worker-lister button[action=updateAction]' : { click : me.updateAction }, /* 저장 */
			'module-salework-worker-lister button[action=cancelAction]' : { click : me.cancelAction },  /* 취소 */
			'module-salework-lister-master' : {
				itemdblclick : me.selectDetail ,
				selectionchange : me.attachRecord
			}

		});
		me.callParent(arguments);
	},
	pocket : {
		layout  : function () { return Ext.ComponentQuery.query('module-salework-layout')[0] } ,
		search  : function () { return Ext.ComponentQuery.query('module-salework-search')[0] } ,
		worker  : {
			editor  : function () { return Ext.ComponentQuery.query('module-salework-worker-editor')[0] } ,
			lister  : function () { return Ext.ComponentQuery.query('module-salework-worker-lister')[0]} ,
			search  : function () { return Ext.ComponentQuery.query('module-salework-worker-search')[0]}

		},
		lister  : {
    	    master  : function () { return Ext.ComponentQuery.query('module-salework-lister-master')[0] } ,
    	    detail  : function () { return Ext.ComponentQuery.query('module-salework-lister-detail')[0] },
    	    payment  : function () { return Ext.ComponentQuery.query('module-salework-lister-payment')[0] }
        }
	},
	selectAction:function(callbackFn) {

		var me = this,
		    lister = me.pocket.lister.master()
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		lister.select({
			callback:function(records, operation, success) {
				mask.hide();
			}, scope:me
		}, Ext.merge( me.pocket.search().getValues(), { stor_id : _global.stor_id }, { stor_grp : _global.stor_grp } )  );

	},
	attachRecord:function( smodel, record ){
		var me     = this
			master = smodel ? smodel.view.ownerCt : me.pocket.lister.master(),
			record = record ? record[0] : master.getSelectionModel().getSelection()[0]
		;
		me.pocket.lister.detail().eraser() ;
		me.pocket.lister.payment().eraser() ;
	},
	itemTabChange : function (tabPanel, newCard, oldCard ){
		var me    = this,
		    index = tabPanel.items.indexOf(newCard),
			lister = me.pocket.lister.master(),
			record = lister.getSelectionModel().getSelection()[0]
		;
		if (record){
			me.selectDetail(lister, record);
		}
	},
	selectDetail:function( grid, record ){
		var me = this,
			mainpanel = me.pocket.layout().down('#mainpanel'),
			mainindex = mainpanel.items.indexOf(mainpanel.getActiveTab())
		;
		if (record) {
			//  마스터의 첫번째 탭인경우
			if (mainindex == 0){
				var itempanel = me.pocket.layout().down('#itempanel')
					itemindex = itempanel.items.indexOf(itempanel.getActiveTab())
				;
				//  디테일의 첫번째 탭인경우
				if (itemindex == 0) {
					var product = me.pocket.lister.detail(),
					    param = { invc_numb :  record.get('invc_numb')},
						mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask })
					;
					mask.show();
					product.select({
						callback : function(records, operation, success) {
							mask.hide();
						}, scope    : me
					}, Ext.merge( param , { stor_id : _global.stor_id }));

				} else
				//  결제 내역 조회 인경우
				if (itemindex == 1) {
					var payment = me.pocket.lister.payment(),
						param   = { invc_numb :  record.get('invc_numb')},
						mask    = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask })
					;
					mask.show();
					payment.select({
						callback : function(records, operation, success) {
							mask.hide();
						}, scope    : me
					}, Ext.merge( param , { stor_id : _global.stor_id }));
				}
			} //end.if (tindex == 0)
		}
	},
	modifyAction:function() {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister() //me.pocket.worker.lister();
			;

		if (!select){
			Ext.Msg.alert("알림", "주문을 선택해 주시기바랍니다.");
			return;
		}

		if (select.get('org_invc_numb') != "")
		{
			Ext.Msg.alert("알림", "주문 정보가 존재합니다. 수정이 불가 합니다.");
			return;
		}

		if (select.get('retn_gb') == '3'  || select.get('retn_gb') == '4') {
			Ext.Msg.show({ title: '알림', msg: '반품/환불건은 수정하실 수 없습니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		}

		if (select.get('row_clos') == '1' ) {
			Ext.Msg.show({ title: '알림', msg: '마감된 내역은 수정하실 수 없습니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		}

		if (select){
			editor.modifyRecord({
				caller  : me,
				action  : 'invoice',
				params  : {param:JSON.stringify({ invc_numb : select.get('invc_numb') })},
				lister  : lister,
				callback: function( results ) {
					if (results.success){
						me.pocket.layout().getLayout().setActiveItem(1);
						results.feedback( {success : true } );
					}
				}
			}, me);
		}
	},
	insertAction:function() {
		var me = this,
		    editor = me.pocket.worker.editor(),
		    lister = me.pocket.lister.master()
		;
		resource.loadPopup({
			select : 'SINGLE',
		    widget : 'lookup-cust-popup',
			params : { stor_id : _global.stor_id, line_stat : '0' },
			values : { cust_sts : ['5', '6' , '7'] },
			apiurl : {
				master : _global.api_host_info + '/system/cust/custstore/get/record.do'
			},
			result : function(records) {
				var parent = records[0]
				;
			editor.insertRecord({
				caller : me,
				action : 'invoice',
					record   : Ext.create( editor.getStore().model.modelName ,{
						cust_idcd     : parent.data.cust_idcd,
						cust_name     : parent.data.cust_name,
						chnl     : parent.data.chnl,
						cust_sts    : parent.data.cust_sts,
						sts_memo    : parent.data.sts_memo,
						mmb_id     : parent.data.mmb_id,
						mmb_nm     : parent.data.mmb_nm,
						sales_man_id : parent.data.sales_man_id,
						salesman_nm : parent.data.salesman_nm,
						chnl     : parent.data.chnl,
						cls1_nm     : parent.data.cls1_nm,
						cls2_nm     : parent.data.cls2_nm,
						cls3_nm     : parent.data.cls3_nm,
						cls4_nm     : parent.data.cls4_nm,
						cls5_nm     : parent.data.cls5_nm,
						cls6_nm     : parent.data.cls6_nm,

						biz_yn      : parent.data.biz_yn,
						biz_zip_cd  : parent.data.biz_zip_cd,
						biz_state   : parent.data.biz_state,
						biz_city    : parent.data.biz_city,
						biz_dong    : parent.data.biz_dong,
						biz_addr_1   : parent.data.biz_addr_1,
						biz_addr_2   : parent.data.biz_addr_2,
						biz_kind    : parent.data.biz_kind,
						biz_email   : parent.data.biz_email,
						biz_fax_no  : parent.data.biz_fax_no,
						biz_nm      : parent.data.biz_nm,
						biz_no      : parent.data.biz_no,
						biz_owner   : parent.data.biz_owner,
						biz_tel_no  : parent.data.biz_tel_no,
						biz_type   : parent.data.biz_type,

						reve_nm     : parent.data.mmb_nm     || parent.data.biz_owner,
						reve_email  : parent.data.reve_email  || parent.data.biz_email ,
						reve_fax_no : parent.data.reve_fax_no || parent.data.biz_fax_no ,
						reve_tel_no : parent.data.reve_tel_no || parent.data.biz_tel_no,
						reve_hp_no : parent.data.reve_hp_no,

						reve_zip_cd : parent.data.reve_zip_cd || parent.data.biz_zip_cd ,
						reve_state  : parent.data.reve_state  || parent.data.biz_state ,
						reve_city   : parent.data.reve_city   || parent.data.biz_city ,
						reve_dong   : parent.data.reve_dong   || parent.data.biz_dong,
						reve_addr_1  : parent.data.reve_addr_1  || parent.data.biz_addr_1 ,
						reve_addr_2  : parent.data.reve_addr_2  || parent.data.biz_addr_2 ,

						cust_usr_memo : parent.data.user_memo,
						cust_owner  : parent.data.biz_owner, // 대표자를 중복해서 보여줘야해서 한개 더 생성함

						pnt_type     		: parent.data.pnt_type,
						pnt_rt     		: parent.data.pnt_rt,
						cash_pnt_rt     : parent.data.cash_pnt_rt,
						card_pnt_rt     : parent.data.card_pnt_rt,

						npay_amt     : parent.data.npay_amt,
						ar_amt_lmt  : parent.data.ar_amt_lmt,
						balance_amount : parent.data.balance_amount,
						lmt_cntl  : parent.data.lmt_cntl,
						colt_schd_type : parent.data.colt_schd_type,
						colt_schd_term : parent.data.colt_schd_term,
						pri_no    : parent.data.pri_no,
						vaccount_no : parent.data.vaccount_no

					}),
					lister   : me.pocket.worker.lister(),
					callback : function (results, record){
						if  (results.success){
							me.pocket.layout().getLayout().setActiveItem(1);
							results.feedback({success : true , visible : true });
						}
					}
				});
			}
		})
	},
	updateAction:function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail()
		;

		editor.updateRecord({
			caller   : me,
			action  : 'invoice',
			before : function(results, info ) {
				if (results.success) {

					var isInvNo = false;
					if (info.phantom && Ext.isEmpty(info.get('invc_numb'))) {
				    	resource.keygen({
				    		url    : _global.api_host_info + '/' + _global.app_site + '/listener/seq/invoice.do',
				    		params : {
				    			token : _global.token_id ,
								param : JSON.stringify({stor_id : _global.stor_id })
				    		},
				    		async  : false,
				    		callback : function( keygen ) {
				    			if (keygen.success) {
				    				info.dirtyValue('invc_numb' , keygen.records );
				    				isInvNo = true
				    			} else {
				    				Ext.Msg.alert("error", keygen.message  );
				    				return;
				    			}
				    		}
				    	});
					} else { isInvNo = true }

					if (isInvNo) {
						var qty      = 0,
							txfree_amt = 0,
							taxtn_amt = 0,
							sply_amt = 0,
							tax_amt      = 0,
							inv_amt   = 0,
							dirty    = false
						;
						info.product().data.each( function( item ) {
							item.set('invc_numb', info.get('invc_numb'));
							qty = qty + Math.abs(item.get('qty'));

							txfree_amt = txfree_amt + item.get('txfree_amt');
							taxtn_amt = taxtn_amt + item.get('taxtn_amt');
							sply_amt = sply_amt + item.get('sply_amt');
							tax_amt      = tax_amt      + item.get('tax_amt'     );
							inv_amt   = inv_amt   + item.get('inv_amt'  );
							if (item.dirty) {
								dirty = true ;
							}
						});
						info.set('qty'      , qty);
						info.set('txfree_amt' , txfree_amt);
						info.set('taxtn_amt' , taxtn_amt);
						info.set('sply_amt' , sply_amt);
						info.set('tax_amt'      , tax_amt);
						info.set('inv_amt'   , inv_amt);
						info.set('colt_schd_amt'  , inv_amt);

						if (dirty){
							info.setDirty();
						}
						results.feedback({success : true  });
					}
				}
			},
			callback : function(results, record, store ) {
				if (results.success){
					store.sync({
						success : function(records, operation){
							var ms;
							if (results.inserted){
							    ms = Ext.create( master.getStore().model.modelName , record.data );
								master.getStore().insert(0 , ms);
							} else {
								ms = master.getStore().findRecord('invc_numb', record.get('invc_numb'));

								Ext.iterate(ms.data, function (key, value) {
									ms.set( key, record.get(key));
								});
							}
							detail.getStore().loadData(record.product().data.items, false);

							master.getSelectionModel().select(ms);
							master.getStore().commitChanges();

							me.pocket.layout().getLayout().setActiveItem(0);
							results.feedback({success : true  });
						}, /* 저장 성공시 */
						failure : function(operation){ results.feedback({success : false });}, /* 저장 실패시 호출 */
						callback: function(operation){ results.callback({}); } /* 성공 실패 관계 없이 호출된다. */
					});
				}
			}
		});
	},
	cancelAction:function() {
		var me = this
		;

		me.pocket.layout().getLayout().setActiveItem(0);
		me.pocket.worker.editor().eraser();
		me.pocket.worker.lister().eraser();
		me.pocket.lister.detail().eraser();
		me.pocket.worker.lister().down('form').attachItem({ clear : true });

	},
	deleteAction:function() {
		var me = this
		 	master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection(),
			record = select[0]
		;

		if (!select || select.length != 1 ){
			Ext.Msg.alert("알림","취소 하시려는 1건을 선택 후 진행하십시오!");
			return;
		}

		if (record.get('retn_gb') == '3'  || record.get('retn_gb') == '4') {
			Ext.Msg.show({ title: '알림', msg: '반품/환불건은 삭제하실 수 없습니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		}


		if (record.get('payment') != 0 ) {
			Ext.Msg.show({ title: '알림', msg: '수금된 내역은 삭제하실 수 없습니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		}

		if (record.get('tax_no') != '' ) {
			Ext.Msg.show({ title: '알림', msg: '세금 계산서 발행된 내역은 삭제하실 수 없습니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		}

		if (record.get('sts_cd') != '0500') {
			Ext.Msg.show({ title: '알림', msg: '삭제할수 없는 상태입니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		}

		if (record.get('row_clos') == '1' ) {
			Ext.Msg.show({ title: '알림', msg: '마감된 내역은 삭제하실 수 없습니다.', icon: Ext.Msg.INFO, buttons: Ext.Msg.YES, defaultFocus: 'yes', scope: me });
			return;
		}

		Ext.Msg.confirm("확인","삭제하시겠습니까?",  function(button) {
			if(button === 'yes'){

				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url: _global.api_host_info + '/' + _global.app_site + '/sale/salework/set/del_yn.do' ,
					method:"POST",
					params: {
					 	token : _global.token_id ,
						param : Ext.encode({
							invc_numb    : record.get('invc_numb' ),
							upt_id : _global.emp_id
						})
					},
					success: function (response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if (result.success){

							var store = master.getStore();
							store.remove(record);
							store.commitChanges();


						}else{
							Ext.Msg.show({ msg: result.message,  buttons: Ext.Msg.YES, icon: Ext.Msg.ERROR });
						}
					},
					failure: function (response, request) {


						resource.httpError(response);

					},
					callback : function ( sdddd) {
						mask.hide();
					}

				});

			}
		});
	},

	closeAction : function(config){
		var me  = this,
			lister = me.pocket.lister.master() ,
			select = lister.getSelectionModel().getSelection(),
			result = true
		;

		if (!select || select.length <= 0) {
			Ext.Msg.error(  config.text + '처리할 데이터를 선택하여 주시기 바랍니다.');
			return;
		}

		if( select.length == 1 && select[0].get('row_clos') == config.action_value ) {
			Ext.Msg.error( '이미 처리된 ' + config.text + '건 입니다.');
			return;
		}

		var reqdata = [] ;
		Ext.each(select, function(record) {
			/* 현재 데이터의 마감 상태와, 작업 하려는 마감 상태가 다른 경우만 처리 하기 위해서 */
			if (record.get('row_clos') != config.action_value) {
				reqdata.push({
					invc_numb    : record.get('invc_numb'),
					row_clos : config.action_value , /* 0 : 마감해지 1:마감처리 */
					upt_id : _global.login_pk
				});
			} else {
				result = false;
				Ext.Msg.error( '이미 ' + config.text + '처리 된 건이 존재합니다.');
				return;
			}
		});

		if (result && reqdata.length > 0) {
			Ext.Msg.show({ title: '확인', msg: '[' +reqdata.length +']건을 ' +  config.text + ' 처리 하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
				fn: function (button) {
					if (button=='yes') {
						var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
						mask.show();
						Ext.Ajax.request({
							url     : _global.location.http() + '/sale/salework/set/close.do',
							params  : {
								token : _global.token_id,
								param : JSON.stringify({
									records      : reqdata ,
								})
							},
							async   : false,
							method  : 'POST',
							success : function(response, request) {
								var result = Ext.decode(response.responseText);
								if (!result.success ){
									Ext.Msg.error( result.message );
									return;
								} else {

									Ext.each(select, function(record) {
										record.dirtyValue('row_clos' , config.action_value );
									});

									lister.getStore().commitChanges();
									Ext.Msg.alert('알림',   config.text + ' 처리 완료 되었습니다.' );
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								mask.hide();
							}
						});
					}
				}
			});
		}
	},
	exportAction : function(self){
		this.pocket.lister.master().writer({enableLoadMask:true});

	},
	exportDetailAction : function(self) {
		this.pocket.lister.detail().writer({enableLoadMask:true});
	},

	invReportAction:function(button) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection()
		;
		if(select.length === 0) {
			Ext.Msg.alert("알림", "매출문서를 선택해 주십시오.");
			return;
		} else if(select.length === 1) {
			resource.loadPrint({
				preview        : true,                                 // 미리보기
				enableLoadMask : true,                                 // mask 띄우기
				invoiceType    : Const.InvoiceType.SALE,               // 거래명세서 (필수)
		        params         : { invc_numb : select[0].get('invc_numb'),  biz_fax_no : select[0].get('fax_no'),
								title : '거래명세서', cust_idcd : select[0].get('cust_cd'),  cust_name : select[0].get('cust_name'), invc_numb : select[0].get('invc_numb'),
								use_fax : _global.stor_fax_id }, // url로 보낼 파라미터 (FAX 전송)
				previewParams   : { email : select[0].get('reve_email'), fax : select[0].get('reve_fax_no') },
		        requrl         : {                                     // url
		        	search : _global.api_host_info + '/' + _global.app_site +'/sale/salework/get/printing.do',
		        },
		        callback       : function (success) {
		        	if(success) {
		        	}
		        }
			});

		} else {

			var successArr = [];
			var failureArr = [];

		    // type2. 다중출력
			var batch = Axt.util.Batch.getInstance();

			var idx = 0;
			select.forEach( function(data) {
				batch.add(function(){
					// 출력 호출

					var invNo = data.get('invc_numb');
					if(idx === 1 || idx === 4) {
						invNo = '123445';
					}

					idx ++;

					resource.loadPrint({
						preview     : false,                           // 미리보기 안함
						invoiceType : Const.InvoiceType.SALE,          // 거래명세서 (필수)
						params      : { invc_numb : invNo }, // url로 보낼 파라미터
						requrl      : {                                // url
							search : _global.api_host_info + '/' + _global.app_site +'/sale/salework/get/printing.do',
						},
						callback : function (success) {
							if(success){
								successArr.push(data.get('invc_numb'));
								// next()를 실행해줘야 순차적으로 실행된다.
								batch.next();
							} else {
								failureArr.push(data.get('invc_numb'));
								batch.next();
							}
						}
					}); // end loadPrint
				});
			}); // end forEach

			/* 여기서 출력 시작! */
			batch.run({
				enableLoadMask : true,
				maskMsg : '출력중입니다... ($count/$total)',
				callback : function (success, message) {
					if(success && failureArr.length === 0){
						Ext.Msg.alert('', '완료 되었습니다.');
					} else {
						var errorMsg = '';
						errorMsg += '출력 성공한 건수 : '+ successArr.length +'건<br/>';
						errorMsg += '출력 실패한 건수 : '+ failureArr.length +'건<br/>';
						errorMsg += '(실패번호 : "' + failureArr.join('", "') + '")';
						Ext.Msg.alert('', errorMsg);
					}
				}
			});
		}
	},


	ExcelPaste : function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.worker.lister(),
			record = editor.getRecord() ,
			product = lister.getStore()
		;
		resource.loadPopup({
			select : 'SINGLE',
			widget : 'module-salework-excel',
			params : {
				cust_idcd  : record.get('cust_idcd'  ),
				mmb_id  : record.get('mmb_id'  ),
				cust_gb  : record.get('cust_gb'  ),
				chnl  : record.get('chnl'  ),
				pri_no : record.get('pri_no' )
			},
			result : function(records) { /* 엑셀팝업 리턴값 */
				records.forEach( function( item ){
					is_equal = false ;
					if (!Ext.isEmpty(item) && item.data._sts == '1' ) {
						product.each( function( data ){
							if (data.data.item_idcd == item.data.item_idcd
								&& data.data.item_code  == item.data.item_code
								&& data.data.item_name  ==(item.data.item_name || '')
								&& data.data.item_spec  ==(item.data.item_spec || '')
								&& data.data.unit_name  == item.data.unit_name
								&& data.data.pri    == item.data.cust_pri ){
								is_equal = true;
								data.dirtyValue('qty', String(Number(data.data.qty) + Number(item.data.qty)) );
								data.recalculation(editor.getRecord( data ));
							}
						});
						if (!is_equal) {
							count = lister.getStore().getCount() ;
							var seq = editor.getSEQ();
							var dsp = editor.getDSP();
							ms = Ext.create( product.model.modelName , {
								line_seqn       : seq ,
								seq_top       : seq ,
								seq_dsp       : dsp ,
								unit_idcd       : item.data.unit_idcd,
								unit_name       : item.data.unit_name,
								piece_qty      : item.data.piece_qty,
								item_idcd       : item.data.item_idcd,
								item_code       : item.data.item_code,
								itm_shrt_cd       : item.data.itm_shrt_cd,
								brcd       : item.data.brcd,
								item_name       : item.data.item_name,
								item_spec       : item.data.item_spec,
								po_pri      : item.data.po_pri,
								unt_pri    : item.data.sale_pri,
								cust_pri    : item.data.cust_pri,
								qty           : item.data.qty,
								pri         : item.data.cust_pri,
								brand_id      : item.data.brand_id,
								brand_nm      : item.data.brand_nm,
								maker_id        : item.data.maker_id,
								mfg_nm        : item.data.mfg_nm,
								txfree_yn      : item.data.txfree_yn,
								po_pri_type : item.data.po_pri_type,
								po_pri_rt : item.data.po_pri_rt
							});
							product.insert( Number(count) , ms);
							ms.recalculation(editor.getRecord( ms ));
						}
					}
				});
				me.pocket.worker.lister().getView().refresh();
			}
		});
	},

	ExcelPaste2 : function() {
		var me = this,
		editor = me.pocket.worker.editor(),
		lister = me.pocket.worker.lister(),
		store  = editor.getStore(),
		value  = editor.getValues(),
		search = me.pocket.worker.search(),
		product = lister.getStore(),
		is_equal = false
		;
		if ( store.getAt(0) ){ /* 수정 */
			var custid = store.getAt(0).get('cust_idcd') ;
			var priceno = store.getAt(0).get('pri_no') ;

		}
		else { /* 신규작업 */
			console.debug('insert');

			var custid = value.cust_idcd ;
			var priceno = value.pri_no ;

		}

		resource.loadPopup({
			select : 'SINGLE',
			widget : 'module-salework-excel',
			result : function(records) { /* 엑셀팝업 리턴값 */

				records.forEach( function( item ){
					var count  = lister.getStore().getCount() ;
					is_equal   = false ;
					if ( item.get('_sts') == '1' ){ /* 품목 조회결과가 성공인 건만 조회 */
						Ext.Ajax.request({
							url: _global.api_host_info + '/system/sale/salework/get/product.do',
							params: { token : _global.token_id, param : JSON.stringify({ stor_id : _global.stor_id , cust_idcd : custid , pri_no : priceno
								, records : [{ item_idcd : item.get('item_idcd') }]   }) } ,
							method:'POST',
							async: false,
							success:function(response, request){
									var result = Ext.decode(response.responseText);
									var record = result.records[0] ;
									var length = result.records.length ;

									if (!Ext.isEmpty( record)) {
										if ( item.get('pri') == '0'  ){ 	/* 엑셀에 입력한 단가가 0 인 경우 */
										} else { 							/* 엑셀에 입력한 단가가 0이 아닌 경우 */

											record.cust_pri = item.get('pri') ;
											record.sale_pri = item.get('pri') ;
										}

										if ( count == 0  ){ 									/* product count == 0 인 경우 */

											count = lister.getStore().getCount() ;

											var seq = editor.getSEQ();
											var dsp = editor.getDSP();

											record.qty = item.get('qty') ;

											ms = Ext.create( product.model.modelName , {
												line_seqn       : seq ,
												seq_top       : seq ,
												seq_dsp       : dsp ,
												mst_itm_id       : record.mst_itm_id,
												mst_itm_cd       : record.mst_itm_cd,
												unit_idcd       : record.unit_idcd,
												unit_name       : record.unit_name,
												piece_qty      : record.piece_qty,
												item_idcd       : record.item_idcd,
												item_code       : record.item_code,
												item_name       : record.itm_ds || record.brand_nm+'/'+record.item_name ,
												item_spec       : record.item_spec,
												po_pri      : record.po_pri,

												unt_pri    : record.sale_pri,
												cust_pri    : record.cust_pri,

												qty           : record.qty,
												pri         : record.cust_pri,
												brand_id      : record.brand_id,
												brand_nm      : record.brand_nm,
												maker_id        : record.maker_id,
												mfg_nm        : record.mfg_nm,
												txfree_yn      : record.txfree_yn,
												po_pri_type : record.po_pri_type,
												po_pri_rt : record.po_pri_rt
											});

											product.insert( Number(count) , ms);

											ms.recalculation(editor.getRecord( ms ));

										} else { 													/* product count != 0 인 경우 */
											product.each( function( data ){
												if ( !record.item_spec ){
													record.item_spec = '' ;
												}
												if (data.get('item_idcd') == record.item_idcd
														&& data.get('item_code') == record.item_code
														&& data.get('item_name') == ( record.itm_ds || record.item_name)
														&& (data.get('item_spec') == record.item_spec || '' )
														&& data.get('unit_name') == record.unit_name
														&& data.get('pri') == record.cust_pri ) {
													is_equal = true;

													data.dirtyValue('qty', String(Number(data.get('qty')) + Number(item.get('qty'))) );

													data.recalculation(editor.getRecord( data ));
												}
											});

											/* 상품을 추가 */
											if (!is_equal) {
												count = lister.getStore().getCount() ;

												var seq = editor.getSEQ();
												var dsp = editor.getDSP();

												record.qty = item.get('qty') ;

												ms = Ext.create( product.model.modelName , {
													line_seqn       : seq ,
													seq_top       : seq ,
													seq_dsp       : dsp ,
													mst_itm_id       : record.mst_itm_id,
													mst_itm_cd       : record.mst_itm_cd,
													unit_idcd       : record.unit_idcd,
													unit_name       : record.unit_name,
													piece_qty      : record.piece_qty,
													item_idcd       : record.item_idcd,
													item_code       : record.item_code,
													item_name       : record.itm_ds || record.brand_nm+'/'+record.item_name ,
													item_spec       : record.item_spec,
													po_pri      : record.po_pri,

													unt_pri    : record.sale_pri,
													cust_pri    : record.cust_pri,

													qty           : record.qty,
													pri         : record.cust_pri,
													brand_id      : record.brand_id,
													brand_nm      : record.brand_nm,
													maker_id        : record.maker_id,
													mfg_nm        : record.mfg_nm,
													txfree_yn      : record.txfree_yn,
													po_pri_type : record.po_pri_type,
													po_pri_rt : record.po_pri_rt
												});

												product.insert( Number(count) , ms);

												ms.recalculation(editor.getRecord( ms ));
											}

										}

									}



									me.pocket.worker.lister().getView().refresh();

								}
						});

					}

				});

			}
		});

	},
	PriceChange : function() {
		var me = this,
			editor = me.pocket.worker.editor(),
			value  = editor.getValues(),
			store  = editor.getStore(),
			lister = me.pocket.worker.lister(),
			data   = undefined,
			priceno = undefined
		;

		if (store.getAt(0)) { /* 수정인 경우 */
			data = store.getAt(0).product();
			priceno = store.getAt(0).get('pri_no');
		} else {
			if (lister.getStore().data.length) { /* 신규 - 상품이 있는 경우 */
				data = lister.getStore();
				priceno = value.pri_no;
			} else { /* 신규 - 상품이 없는 경우 */
				Ext.Msg.alert("알림", "상품을 추가해주시기 바랍니다.");
				return;
			}
		}

		resource.loadPopup({
			select : 'MULTI',
			widget : 'module-pricechange-popup',
			values : { record : data },
			params : { pri_no : priceno },
			result : function(pri_no) {
				lister.getStore().each( function( item ){
					item.recalculation(editor.getRecord());
				});
			}
		});
	},
	orderAction:function(callbackFn) {
		var me = this,
			select = me.pocket.lister.master().getSelectionModel().getSelection(),
			master = me.pocket.lister.master()
		;

		var err_msg = "";
		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				// 고객상태가 '거래정지'인 경우
				if (record.get("cust_sts") == "9") {
					err_msg = "고객이 현재 '거래정지' 상태입니다. 확인 후 다시 주문등록하여 주십시오.<br><br><font color=red>거래처명 : " + record.get("cust_name") + "<br>정지사유 : " + record.get("sts_memo") + "</font>";
				}

				// '주문대기' 상태가 아닌 경우
				if (record.get("sts_cd") != "0100") {
					err_msg = "주문대기 상태가 아닙니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		} else {
			Ext.Msg.alert("알림", "주문등록할 데이터를 선택하여 주시기 바랍니다.");
			return;
		}

		if (select) {
	 		Ext.Msg.show({ title: '확인', msg: '선택하신 견적을 주문등록 하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
	 			fn: function (button) {
	 				if (button=='yes') {
	 					Ext.each(select, function(record) {
	 						record.set('_flag', '2');     // 1:마감&해지 / 2:주문등록&등록취소
	 						record.set('sts_cd', '0200'); // 0100:주문대기 / 0200:주문처리
	 					});

	 					var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
	 					mask.show();

	 					master.getStore().sync({
	 						success : function(batch, operation){  /* 저장 성공시 */
	 						},
	 						failure : function(operation){  /* 저장 실패시 호출 */
	 							master.getStore().rejectChanges();
	 						},
	 						callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
	 							mask.hide();
	 						}
	 					});
	 				}
	 			}
	 		});
		}
	}

});
