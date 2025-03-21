Ext.define('module.custom.sjflv.sale.order.oemmast.OemMast', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.CstmDeliPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload',
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.LottPopup',
		'module-sjflv-oemmast-price-popup'
	],

	models:[
		'module.custom.sjflv.sale.order.oemmast.model.OemMastMaster',
		'module.custom.sjflv.sale.order.oemmast.model.OemMastMaster2',
		'module.custom.sjflv.sale.order.oemmast.model.OemMastMaster3',
		'module.custom.sjflv.sale.order.oemmast.model.OemMastDetail',
		'module.custom.sjflv.sale.order.oemmast.model.OemMastPrice',

	],
	stores:[
		'module.custom.sjflv.sale.order.oemmast.store.OemMastMaster',
		'module.custom.sjflv.sale.order.oemmast.store.OemMastMaster2',
		'module.custom.sjflv.sale.order.oemmast.store.OemMastMaster3',
		'module.custom.sjflv.sale.order.oemmast.store.OemMastDetail',
		'module.custom.sjflv.sale.order.oemmast.store.OemMastDetail2',
		'module.custom.sjflv.sale.order.oemmast.store.OemMastDetail3',
		'module.custom.sjflv.sale.order.oemmast.store.OemMastPrice',

	],
	views : [
		'module.custom.sjflv.sale.order.oemmast.view.OemMastLayout',
		'module.custom.sjflv.sale.order.oemmast.view.OemMastListerMaster',
		'module.custom.sjflv.sale.order.oemmast.view.OemMastListerMaster2',
		'module.custom.sjflv.sale.order.oemmast.view.OemMastListerMaster3',
		'module.custom.sjflv.sale.order.oemmast.view.OemMastListerDetail',
		'module.custom.sjflv.sale.order.oemmast.view.OemMastListerDetail2',
		'module.custom.sjflv.sale.order.oemmast.view.OemMastListerDetail3',
		'module.custom.sjflv.sale.order.oemmast.view.OemMastPopup',
		'module.custom.sjflv.sale.order.oemmast.view.OemMastPrintPopup',
		'module.custom.sjflv.sale.order.oemmast.view.OemMastPricePopup',
		'module.custom.sjflv.sale.order.oemmast.view.OemMastSearch',

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
//		this.joinPermission(workspace.down('module-sjflv-saleorder-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
//		this.joinPermission(workspace.down('module-sjflv-saleorder-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
//		this.joinPermission(workspace.down('module-sjflv-saleorder-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-sjflv-oemmast-layout button[action=selectAction]'				: { click 	: me.selectAction  	}, 		/* 조회 */
			'module-sjflv-oemmast-lister-master menuitem[action=closeAction]'		: { click 	: me.closeAction        },	/* 마감 */
			'module-sjflv-oemmast-lister-master menuitem[action=closeCancelAction]'	: { click 	: me.closeCancelAction  },	/* 마감해지 */
			'module-sjflv-oemmast-layout button[action=outAction]	'				: { click 	: me.outAction     	}, 		/* OEM 제공품 출고 */
			'module-sjflv-oemmast-layout button[action=updateAction]'				: { click 	: me.updateAction  	},		/* OEM 제공품 출고(저장) */
			'module-sjflv-oemmast-layout button[action=cancelAction]'				: { click 	: me.cancelAction  	},		/* OEM 제공품 출고(취소)) */
			'module-sjflv-oemmast-layout button[action=inAction]	'				: { click 	: me.inAction      	}, 		/* OME 제품입고 */
			'module-sjflv-oemmast-lister-master button[action=priceAction]	'		: { click 	: me.priceAction    },		/* OEM 제품단가 */

			'module-sjflv-oemmast-lister-master2' 									: {itemclick: me.master2Select	},

			'module-oemmast-lister-detail button[action=printAction]'				: { click 	: me.printAction	}, 		/* OEM 제공품인수증 발행 */
			'module-oemmast-lister-detail button[action=deleteAction]'				: { click 	: me.outDelAction	}, 		/* OEM 제공품출고 내역(삭제) */
			'module-oemmast-lister-detail2 button[action=deleteAction]'				: { click 	: me.inDelAction 	}, 		/* OME 제품입고 내역(삭제) */

			'module-sjflv-oemmast-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-sjflv-oemmast-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-sjflv-oemmast-search')[0] },
		lister : {
			master	: function () { return Ext.ComponentQuery.query('module-sjflv-oemmast-lister-master'	)[0] },
			master2	: function () { return Ext.ComponentQuery.query('module-sjflv-oemmast-lister-master2'	)[0] },
			master3	: function () { return Ext.ComponentQuery.query('module-sjflv-oemmast-lister-master3'	)[0] },
		},
		detail : function () { return Ext.ComponentQuery.query('module-oemmast-lister-detail')[0] },
		detail2 : function () { return Ext.ComponentQuery.query('module-oemmast-lister-detail2')[0] },
		detail3 : function () { return Ext.ComponentQuery.query('module-oemmast-lister-detail3')[0] },
		popup : function () { return Ext.ComponentQuery.query('module-sjflv-oemmast-popup')[0] },
	},
	selectAction : function(callbackFn) {
		var me = this,
			lister = me.pocket.lister.master()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
		lister.select({
			 callback:function(records, operation, success) {
				if (success) {
					if (_global.options.mes_system_type.toUpperCase() != 'SJFLV') {
						lister.getSelectionModel().select(0);
					}
				} else {  }
				mask.hide();
			}, scope:me
		}, Ext.merge(me.pocket.search().getValues(), { stor_id : _global.stor_id }));
	},
	// 마감
	closeAction:function() {
		var me	= this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection()
			err_msg = "";
		;

		if (!select || select.length == 0) {
			Ext.Msg.alert("알림", "마감해지 자료를 선택하세요.");
			return;
		}

		var i = 0;
		Ext.each(select, function(record) {
			if (record.get("line_clos") == "1") {
				err_msg = "마감된 자료가 선택되었습니다.";
				return;
			}
		});

		if (err_msg != "") {
			Ext.Msg.alert("알림", err_msg);
			return;
		}

		Ext.Msg.show({ title: '확인', msg: '선택된 자료를 마감하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn: function (button) {
				if (button=='yes') {
					Ext.each(select, function(record) {
						record.set('_flag', '1');     // 1:마감&마감해지
						record.set('line_clos', '1'); // 0:마감해지 / 1:마감
						record.store.commitChanges();
					});
					Ext.each(select, function(record) {
						Ext.Ajax.request({
							url		: _global.location.http() + '/listener/set/close.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									invc_numb		: record.get('invc_numb'),
									line_clos		: '1',
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									table			: 'acpt_mast'
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					})
				}
			}
		});
	},
	// 마감해지
	closeCancelAction:function(callbackFn) {
		var me	= this,
			master = me.pocket.lister.master(),
			select = master.getSelectionModel().getSelection()
			err_msg = "";
		;

		if (!select || select.length == 0) {
			Ext.Msg.alert("알림", "해지 자료를 선택하세요.");
			return;
		}

		var i = 0;
		Ext.each(select, function(record) {
			if (record.get("line_clos") != "1") {
				err_msg = "마감되지 않은 자료가  선택되었습니다.";
				return;
			}
		});

		if (err_msg != "") {
			Ext.Msg.alert("알림", err_msg);
			return;
		}

		Ext.Msg.show({ title: '확인', msg: '선택된 자료를 마감 해지하시겠습니까?', icon: Ext.Msg.QUESTION, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,

			fn: function (button) {
				if (button=='yes') {
					Ext.each(select, function(record) {
						record.set('_flag'		, '1'); // 1:마감&마감해지
						record.set('line_clos'	, '0'); // 0:마감해지 / 1:마감
						record.store.commitChanges();
					});

					Ext.each(select, function(record) {
						Ext.Ajax.request({
							url		: _global.location.http() + '/listener/set/close.do',
							params	: {
								token : _global.token_id,
								param : JSON.stringify({
									invc_numb		: record.get('invc_numb'),
									line_clos		: '0',
									stor_id			: _global.stor_id,
									hqof_idcd		: _global.hqof_idcd,
									table			: 'acpt_mast'
								})
							},
							async	: false,
							method	: 'POST',
							success	: function(response, request) {
								var result = Ext.decode(response.responseText);
								if	(!result.success ){
									Ext.Msg.error(result.message );
									return;
								} else {
								}
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
							}
						});
					})
				}
			}
		});
	},
	// OEM 제공품 출고
	outAction : function(){
		var me		= this,
			search	= me.pocket.search(),
			layout	= me.pocket.layout(),
			master	= me.pocket.lister.master(),
			master2	= me.pocket.lister.master2(),
			record = master.getSelectionModel().getSelection(),
			select	= me.pocket.lister.master().getSelectionModel().getSelection()[0]
		;
		var records = master.getSelectionModel().getSelection();
		var err_msg = "";

//		search.hide();
//		layout.getLayout().setActiveItem(1);
//		console.log(master.getSelectionModel().getSelection());

		var err_msg = "";
		if (!records || records.length==0) {
			Ext.Msg.alert("알림", " OEM 수주를 선택하여주십시오.");
			return;
		}

		layout.getLayout().setActiveItem(1);
		search.hide();
		master2.select({
			callback:function(records, operation, success) {
				if (success) {
				} else {  }
			}, scope:me
		}, Ext.merge(master.getSelectionModel().getSelection()[0].data, { stor_id : _global.stor_id, revs_dvcd : '1' }));
	},

	// OEM 제공품 출고(저장)
	updateAction : function(){
		var me		= this,
			layout	= me.pocket.layout(),
			search	= me.pocket.search(),
			master	= me.pocket.lister.master().getSelectionModel().getSelection()[0].data,
			master2	= me.pocket.lister.master(),
			master3	= me.pocket.lister.master3(),
			record	= master3.getSelectionModel().getSelection(),
			record2	= master3.getStore().getUpdatedRecords(),
			row = []
		;
		if(record.length==0){
			return;
		}

		for(var i=0; i<record2.length; i++){
			if (!Ext.isEmpty(record2[i].get('invc_date')) && record2[i].get('ostt_qntt') != 0 && !Ext.isEmpty(record2[i].get('lott_numb'))) {
				Ext.Ajax.request({
					url			: _global.location.http() + '/listener/seq/maxid.do',
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id	: _global.stor_id,
							table_nm: 'isos_book'
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						Ext.merge(record2[i].data, {	invc_numb		: result.records[0].seq,
														orig_invc_numb 	: master.invc_numb,
														orig_seqn		: master.line_seqn,
														acpt_date		: master.invc_date,
														unit_idcd		: master.unit_idcd,
														bzpl_idcd		: '001',
														drtr_idcd		: _global.login_id,
														invc_dvcd		: '2800',
														stok_type_dvcd	: '1',
														cstm_idcd		: master.cstm_idcd,
						})
						master2.getStore().reload();
						Ext.Msg.alert("알림", " 출고 처리가 되었습니다.");
					}
				});
				row.push(record2[i].data);
				console.log(i);
			} else {
				console.log(i);
				Ext.Msg.alert("알림", "수량 / batch번호 / 출고일자를 입력해주세요.")
				return;
			}

		};


		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		mask.hide();
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/sjflv/sale/order/oemmast/set/ostt.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					records : row
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else {
					master3.getStore().reload();
				}
				Ext.Msg.alert("알림", "출고 처리가 되었습니다.");
			},
			failure : function(result, request) {
			},
			callback: function(operation){   //성공 실패 관계 없이 호출된다.
				mask.hide();
			}
		});
		search.show();
		layout.getLayout().setActiveItem(0);
	},
	// OEM 제공품 출고(취소))
	cancelAction : function(){
		var me		= this,
			search	= me.pocket.search(),
			layout	= me.pocket.layout(),
			master	= me.pocket.lister.master(),
			master2	= me.pocket.lister.master2(),
			master3	= me.pocket.lister.master3()
		;
		search.show();
		layout.getLayout().setActiveItem(0);
		master2.down('[name=revs_dvcd]').setValue('1');
		master2.getStore().clearData();
		master2.getStore().removeAll();
		master3.getStore().clearData();
		master3.getStore().removeAll();
		master.getStore().reload();
	},
	// OME 제품입고
	inAction : function(){
		var me	= this,
			popup	= me.pocket.popup(),
			master	= me.pocket.lister.master()
		;

		var err_msg = "";
		var records = master.getSelectionModel().getSelection()[0];
		if (!records || records.length==0) {
			Ext.Msg.alert("알림", " OEM 수주를 선택하여주십시오.");
			return;
		}

		resource.loadPopup({
			widget	: 'module-sjflv-oemmast-popup',
			apiurl	: {
				upload : _global.location.href + '/custom/sjflv/system/sale/order/saleorder/excel.do', // url (필수)
			},
			params	: {
				stor_id	: _global.stor_id,
				table_nm: 'acpt_mast',
				acct_bacd : records.get('acct_bacd'),
				unit_idcd : records.get('unit_idcd'),
				cstm_idcd : records.get('cstm_idcd'),
			},
			title	: 'OEM 제품입고 등록',				// popup title (옵션)
		});
	},
	// OEM 제품단가
	priceAction : function(){
		var me	= this,
			popup	= me.pocket.popup(),
			master	= me.pocket.lister.master(),
			records	= master.getSelectionModel().getSelection()[0],
			rcpt_cmpy_new = "Y"
		;

		var err_msg = "";
		if (!records || records.length==0) {
			Ext.Msg.alert("알림", " OEM 수주를 선택하여주십시오.");
			return;
		}

		if (!Ext.isEmpty(records.get('rcpt_cmpy_idcd'))) {
			rcpt_cmpy_new = "N";
		}

		resource.loadPopup({
			widget	: 'module-sjflv-oemmast-price-popup',
			params :
			{
				invc_numb		: records.get('invc_numb'),
				line_seqn		: records.get('line_seqn'),
				item_idcd		: records.get('item_idcd'),
				revs_numb		: records.get('revs_numb'),
				rcpt_cmpy_idcd	: records.get('rcpt_cmpy_idcd'),
				rcpt_cmpy_name	: records.get('rcpt_cmpy_name'),
				bsmt_amnt		: records.get('bsmt_amnt'),
				make_cost		: records.get('make_cost'),
				rcpt_cmpy_new 	: rcpt_cmpy_new
			},
		});
	},
	// OEM 제공품인수증 발행
	printAction:function() {
		var me = this,
			detail = me.pocket.detail(),
			record = detail.getSelectionModel().getSelection(),
			select = detail.getSelectionModel().getSelection()[0],
			jrf = 'sjflv_receipt_saleorder.jrf',
			resId =_global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = detail.getSelectionModel().getSelection();
		if (!records || records.length==0) {
			Ext.Msg.alert("알림", "출고등록 목록중 1건이상을 선택하여주십시오.");
			return;
		}else{
			resource.loadPopup({
				widget : 'module-oemmast-print-popup',
			});
		}
		console.log(records);

//		var a = "";
//		for(var i =0; i< record.length ; i++){
//			if(i==0){
//				a+= "[";
//			}
//				a+= '{\'invc_numb\':\''+record[i].get('invc_numb')+'\',\'line_seqn\':\''+record[i].get('line_seqn')+'\'}';
//			if(i != record.length -1){
//				a+=",";
//			}else{
//				a+="]";
//			}
//		}
//		var _param = '_param~{\'records\':'+a+'}~';
//		var arg = _param;
//		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
//		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
//		return win;
	},
	// OEM 제공품출고 내역(삭제)
	outDelAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			detail = me.pocket.detail(),
			store  = detail.getStore(),
			store2  = master.getStore()
		;

		var err_msg = "";
		var records  = detail.getSelectionModel().getSelection();

//		if (!records || records.length!=1) {
//			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
//			return;
//		}

		Ext.Msg.confirm("확인", "출고내역을 삭제하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();
				for (var i = 0; i < records.length; i++) {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/sale/order/oemmast/set/deleteOstt.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								bzpl_idcd		: records[i].get('bzpl_idcd'),
								invc_dvcd		: records[i].get('invc_dvcd'),
								invc_numb		: records[i].get('invc_numb'),
								line_seqn		: records[i].get('line_seqn'),
								assi_seqn		: records[i].get('assi_seqn'),
								stok_type_dvcd	: records[i].get('stok_type_dvcd'),
								lott_numb		: records[i].get('lott_numb'),
								orig_invc_numb	: records[i].get('orig_invc_numb'),
								orig_seqn		: records[i].get('orig_seqn'),
								lot_line_seqn	: records[i].get('lot_line_seqn'),
								bsmt_pric		: '0',
								make_cost		: '0'
							})
						},
						success : function(response, request) {
							var object = response,
							result = Ext.decode(object.responseText)
							;
							if (result.success) {
								store2.reload();
							} else {
								Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
							}
							Ext.Msg.alert("알림", "삭제가 완료 되었습니다.");
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
						}
					});
				}
				mask.hide();
			}
		});
	},
	// OME 제품입고 내역(삭제)
	inDelAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			detail = me.pocket.detail2(),
			store  = detail.getStore(),
			store2  = master.getStore()
		;

		var err_msg = "";
		var records1 = master.getSelectionModel().getSelection();
		var records  = detail.getSelectionModel().getSelection();

//		if (!records || records.length!=1) {
//			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
//			return;
//		}

		Ext.Msg.confirm("확인", "입고내역을 삭제하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();
				for (var i = 0; i < records.length; i++) {
					Ext.Ajax.request({
						url			: _global.api_host_info + '/' + _global.app_site + '/custom/sjflv/sale/order/oemmast/set/deleteIstt.do',
						method		: "POST",
						params		: {
							token	: _global.token_id,
							param	: Ext.encode({
								bzpl_idcd		: records[i].get('bzpl_idcd'),
								invc_dvcd		: records[i].get('invc_dvcd'),
								invc_numb		: records[i].get('invc_numb'),
								line_seqn		: records[i].get('line_seqn'),
								assi_seqn		: records[i].get('assi_seqn'),
								stok_type_dvcd	: records[i].get('stok_type_dvcd'),
								lott_numb		: records[i].get('lott_numb'),
								orig_invc_numb	: records[i].get('orig_invc_numb'),
								orig_seqn		: records[i].get('orig_seqn'),
								lot_line_seqn	: records[i].get('lot_line_seqn'),
								bsmt_pric		: '0',
								make_cost		: '0'
							})
						},
						success : function(response, request) {
							var object = response,
							result = Ext.decode(object.responseText)
							;
							if (result.success) {
								store2.reload();
							} else {
								Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
							}
							Ext.Msg.alert("알림", "삭제가 완료 되었습니다.");
						},
						failure : function(response, request) {
							resource.httpError(response);
						},
						callback : function() {
						}
					});
				}
				mask.hide();
			}
		});
	},
	master2Select : function(a, record){
		var me		= this,
			master	= me.pocket.lister.master().getSelectionModel().getSelection()[0],
			master3	= me.pocket.lister.master3()
		;
		master3.select({
			callback:function(records, operation, success) {
				if (success) {
				} else {  }
			}, scope:me
		}, Ext.merge(record.data, { stor_id : _global.stor_id, orig_invc_numb : master.data.invc_numb }));
		console.log(master.data);
	},
	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.detail(),
			detail2 = me.pocket.detail2()
			detail3 = me.pocket.detail3()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record.get('invc_numb'), line_seqn : record.get('line_seqn') });
			detail2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope:me
			}, { invc_numb : record.get('invc_numb'), line_seqn : record.get('line_seqn') });
			detail3.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record.get('invc_numb'), line_seqn : record.get('line_seqn') });
		}
	},
	selectRecord:function( grid, records ){
		var me = this,
				detail = me.pocket.detail(),
				detail2 = me.pocket.detail2()
				detail3 = me.pocket.detail3()
			;
			detail.getStore().clearData();
			detail.getStore().loadData([],false);

			detail2.getStore().clearData();
			detail2.getStore().loadData([],false);

			detail3.getStore().clearData();
			detail3.getStore().loadData([],false);
	},
});
