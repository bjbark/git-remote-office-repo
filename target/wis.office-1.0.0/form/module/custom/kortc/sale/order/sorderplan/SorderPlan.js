Ext.define('module.custom.kortc.sale.order.sorderplan.SorderPlan', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV3',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload'
	],

	models:[
		'module.custom.kortc.sale.order.sorderplan.model.SorderPlanMaster',
		'module.custom.kortc.sale.order.sorderplan.model.SorderPlanDetail',
		'module.custom.kortc.sale.order.sorderplan.model.SorderPlanDetail3',
		'module.custom.kortc.sale.order.sorderplan.model.SorderPlanDetail4',
		'module.custom.kortc.sale.order.sorderplan.model.SorderPlanFile'
	],
	stores:[
		'module.custom.kortc.sale.order.sorderplan.store.SorderPlanMaster',
		'module.custom.kortc.sale.order.sorderplan.store.SorderPlanDetail',
		'module.custom.kortc.sale.order.sorderplan.store.SorderPlanDetail3',
		'module.custom.kortc.sale.order.sorderplan.store.SorderPlanDetail4',
		'module.custom.kortc.sale.order.sorderplan.store.SorderPlanDetail5',
		'module.custom.kortc.sale.order.sorderplan.store.SorderPlanFile'
	],
	views : [
		'module.custom.kortc.sale.order.sorderplan.view.SorderCofmLayout',
		/* 현황 */
		'module.custom.kortc.sale.order.sorderplan.view.SorderPlanSearch',
		'module.custom.kortc.sale.order.sorderplan.view.SorderPlanListerMaster',
		'module.custom.kortc.sale.order.sorderplan.view.SorderPlanListerDetail',
		'module.custom.kortc.sale.order.sorderplan.view.SorderPlanListerDetail2',
		'module.custom.kortc.sale.order.sorderplan.view.SorderPlanListerDetail3',
		'module.custom.kortc.sale.order.sorderplan.view.SorderPlanListerDetail4',
		'module.custom.kortc.sale.order.sorderplan.view.SorderPlanListerDetail5',
		'module.custom.kortc.sale.order.sorderplan.view.SorderPlanProdPopup'
		/* 작업 */
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
		this.joinPermission(workspace.down('module-sorderplan-lister-master menuitem[action=closeAction]'),       Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-sorderplan-lister-master menuitem[action=closeCancelAction]'), Const.PERMIT.MODIFY);
		this.joinPermission(workspace.down('module-sorderplan-lister-master button[action=etcPrintAction]'),      Const.PERMIT.EXPORT);
	},
	init: function() {
		var me = this;
		me.control({
			'module-sorderplan-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-sorderplan-lister-master button[action=bomworkAction]'			: { click : me.bomworkAction      }, /* 소요량계산 */
			'module-sorderplan-lister-master button[action=prodAction]'				: { click : me.prodAction    	  }, /* 진행계획 */
			'module-sorderplan-lister-master button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀 */

			'module-sorderplan-lister-detail3 button[action=updateAction]'			: { click : me.updateAction       }, // 저장
			'module-sorderplan-lister-detail3 button[action=cancelAction]'			: { click : me.cancelAction       }, // 취소

			'module-sorderplan-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},
			'module-sorderplan-lister-detail4' : {
				selectionchange: me.selectRecord2
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-sorderplan-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-sorderplan-search')[0] },
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-sorderplan-lister-master')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-sorderplan-lister-detail')[0] },
			detail2  : function () { return Ext.ComponentQuery.query('module-sorderplan-lister-detail2')[0] },
			detail3  : function () { return Ext.ComponentQuery.query('module-sorderplan-lister-detail3')[0] },
			detail4  : function () { return Ext.ComponentQuery.query('module-sorderplan-lister-detail4')[0] },
			detail5  : function () { return Ext.ComponentQuery.query('module-sorderplan-lister-detail5')[0] }
		},
		popup2   : function () { return Ext.ComponentQuery.query('module-sorderplan-prod-popup')[0] },
	},

	selectAction:function(callbackFn) {
		var me = this,
			lister	= me.pocket.lister.master(),
			search	= me.pocket.search(),
			param	= search.getValues()
		;
		if(param.invc1_date > param.invc2_date || param.deli1_date > param.deli2_date){
			Ext.Msg.alert("알림","기간을 다시 입력해주시기 바랍니다.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
			mask.show();
			lister.select({
				 callback:function(records, operation, success) {
					if (success) {
//						lister.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
		}
	},

	selectRecord:function( grid, records ){
		var me = this,
			detail = me.pocket.lister.detail()
		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);


	},

	//선택
	selectRecord2 :function( grid, record ){
		var	me    = this,
			popup2 = me.pocket.popup2(),
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0];
		;
		var form
		if(popup2){
			form = popup2.down('form');
			form.loadRecord(select);
		}
	},

	selectDetail : function(grid, record) {
		var me = this,
			master = me.pocket.lister.master(),
			detail = me.pocket.lister.detail(),
			detail2 = me.pocket.lister.detail2(),
			detail3 = me.pocket.lister.detail3(),
			records	= master.getSelectionModel().getSelection(),
			layout	= me.pocket.layout(),
			tabPanel = me.pocket.layout().down('#detail'),
			need1 = layout.down('#need1')
			need2 = layout.down('#need2')

		;
		detail2.down('[name=image]').setSrc(null);
		detail2.down('[name=image2]').setSrc(null);

		need1.tab.show();
		need2.tab.hide();

		if (record) {
				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
				mask.show();

				detail.select({
					 callback : function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
					}, scope : me
				}, { invc_numb : record.get('invc_numb'), orgn_dvcd : 'acpt_mast' ,  uper_seqn : record.get('amnd_degr') });
					Ext.Ajax.request({
						url		: _global.location.http() + '/custom/kortc/sale/order/sorderplan/get/image.do',
						params	: {
						    token : _global.token_id,
						    param : JSON.stringify({
							stor_id			: _global.stor_id,
							hqof_idcd		: _global.hqof_idcd,
							invc_numb		: record.get('invc_numb'),
							amnd_degr		: record.get('amnd_degr'),
							line_seqn		: record.get('line_seqn')
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						if	(!result.success ){
							Ext.Msg.error(result.message );
						} else {
							var item_imge = result.records[0].item_imge;
							var item_imge2 = result.records[0].item_imge2;
							if(item_imge != undefined){
								var x = item_imge.toString();
								var img = new Uint8Array(x.split(",")),
								blob = new Blob([img],{type:'image/png'}),
								url = URL.createObjectURL(blob);
								detail2.down('[name=image]').setSrc(url);
							}
							if(item_imge2 != undefined){
								var x = item_imge2.toString();
								var img = new Uint8Array(x.split(",")),
								blob = new Blob([img],{type:'image/png'}),
								url = URL.createObjectURL(blob);
								detail2.down('[name=image2]').setSrc(url);
							}
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					}
				});
			if(record.get('need_yorn') == 1){
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				mask.show();

				detail3.select({
					callback:function(records, operation, success) {
						if (success) {
						} else {}
						mask.hide();
					}, scope:me
				},{ invc_numb : record.get('invc_numb'), amnd_degr : record.get('amnd_degr') , line_seqn : record.get('line_seqn') });
			}else{
				detail3.getStore().clearData();
				detail3.getStore().loadData([],false);
			}
		}
	},

	//소요량계산
	bomworkAction:function() {
		var me	= this,
		master	= me.pocket.lister.master(),
		detail3	= me.pocket.lister.detail3(),
		detail5	= me.pocket.lister.detail5(),
		select	= me.pocket.lister.master().getSelectionModel().getSelection(),
		select2	= me.pocket.lister.master().getSelectionModel().getSelection()[0],
		record	= master.getSelectionModel().getSelection(),
		store	= detail3.getStore(),
		param	='',
		layout	= me.pocket.layout(),
		tpanel = me.pocket.layout().down('#mainpanel'),
		tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		need1 = layout.down('#need1')
		need2 = layout.down('#need2')
		checked	= 0
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();

		if (select2.get('need_yorn') == '1') {
			Ext.Msg.alert("알림", "이미 소요량계산이 완료된 주문입니다.");
			return;
		}

		if(!records || records.length<1){
			Ext.Msg.alert("알림","소요량 계산할 주문목록을 선택해주십시오.");
			return;
		}else{
			if(!checked){
				var a =[];

				for(var i =0; i< record.length ; i++){
				a.push({ invc_numb : record[i].get('invc_numb'),
						 amnd_degr : record[i].get('amnd_degr'),
						 line_seqn : record[i].get('line_seqn'),
						 item_idcd : record[i].get('item_idcd'),
						 invc_qntt : record[i].get('invc_qntt'),
						 drtr_idcd : _global.login_id
					});
				}
				Ext.Msg.confirm("확인", "소요량계산 하시겠습니까?", function(button) {
					if (button == 'yes') {
						Ext.each(select, function(record) {
							record.set('need_yorn', '1'); // 0:마감해지 / 1:마감
							record.store.commitChanges();
						});
						need1.tab.show();
						need2.tab.hide();

						detail5.select({
							callback:function(records, operation, success) {
								if (success) {
								} else {}
							}, scope:me
						}, Ext.merge( {records:a}) );
						Ext.Msg.alert("알림", "소요량계산이 완료 되었습니다.");
//						detail3.getStore().reload();
//						master.getStore().reload();
					}
				});
			}
		}
	},

	prodAction:function() {
		var me = this,
			master = me.pocket.lister.master(),
			popup  = me.pocket.popup2(),
			select = me.pocket.lister.master().getSelectionModel().getSelection()[0],
			records = master.getSelectionModel().getSelection();
		;


		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "진행계획등록할 주문 1건을 선택 후 진행하십시오.");
			return;
		}

		if(select){
			var popup = resource.loadPopup({
				widget : 'module-sorderplan-prod-popup',
				params : {

				},
			});

			setTimeout(function(){
				detail4	= me.pocket.lister.detail4();
				detail4.select({
					callback:function(records, operation, success) {
						if (success) {
							detail4.getSelectionModel().select(0);
						} else { }
					}, scope:me
				}, Ext.merge( { item_idcd : select.get('item_idcd')}) );
			}, 50);
			var form = popup.down('[itemId=popup_editor1]');
			console.log();
			form.getForm().setValues(records[0].data);

		}else{
			Ext.Msg.alert('알림','계획을 등록할 주문내역을 선택해주세요.');
		}
	},

	updateAction:function() {
		var me = this,
			detail3 = me.pocket.detail3(),
			store  = detail3.getStore(),
			changes  = detail3.getStore().getUpdatedRecords().length,
			change   = detail3.getStore().data.items,
			length   = detail3.getStore().data.items.length,
			remove   = detail3.getStore().removed.length
		;

		for (var i = 0; i < changes; i++) {
			if(detail3.getStore().getUpdatedRecords()[i].data.invc_numb == ''){
				chk = 1;
				break;
			}
		}

		if (changes == 0 && change.length == 0 && remove==0 ) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		}else{
			if(length >0){
				modify   = change[length-1].get('modify');		//수정유무

			}
			if(change.length != 0 && changes == 0 && remove==0 && modify == '' ){
				Ext.Msg.alert("알림","변경된 내용이 없습니다.");
				return;
			}
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
		mask.show();
		var store = lister.getStore();
		var msg = "";
		store.each(function(record){
//			if(record.get('cstm_name')==""){
//				msg = "거래처를 입력해주세요.";
//				return false;
//			}
		});
		if(msg!=""){
			Ext.Msg.alert('알림',msg);
			mask.hide();
			return;
		}
		detail3.getStore().sync({
			success : function(operation){ me.selectAction();},
			failure : function(operation){ },
			callback: function(operation){
				mask.hide();
			}
		});
	},

	cancelAction:function() {
		var me = this,
			detail3 = me.pocket.lister.detail3(),
			master	= me.pocket.lister.master(),
			records	= master.getSelectionModel().getSelection()
		;
		var a =[];

		for(var i =0; i< records.length ; i++){
		a.push({ invc_numb : records[i].get('invc_numb'),
				 amnd_degr : records[i].get('amnd_degr'),
				 line_seqn : records[i].get('line_seqn'),
				 item_idcd : records[i].get('item_idcd'),
				 invc_qntt : records[i].get('invc_qntt')
			});
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		detail3.select({
			callback:function(records, operation, success) {
				if (success) {
				} else {}
				mask.hide();
			}, scope:me
		}, Ext.merge( {records:a}) );
	},

	deleteAction2:function(){
		var me = this,
		workerlister = me.pocket.worker.lister(),
		store  = workerlister.getStore(),
		editor = me.pocket.worker.editor(),
		record = editor.getRecord(),
		store2 = editor.getStore()
	;
		console.log(record);
		var err_msg = "";
		var records = workerlister.getSelectionModel().getSelection();

		if (!records || records.length<1) {
			Ext.Msg.alert("알림", "삭제 하시려는 자료를 선택해주세요!");
			return;
		}
		Ext.Msg.show({ title: '삭제 확인 요청', msg: '선택한 자료를 삭제하시겠습니까?', icon: Ext.Msg.ERROR, buttons: Ext.Msg.YESNO, defaultFocus: 'no', scope: me,
			fn : function (button) {
				if (button==='yes') {
					for (var i = 0; i < records.length; i++) {
						store.remove(records[i]);
					}
					if(record.data.modi_yorn=='n'){
						record.set('modi_yorn','y');
						record.store.commitChanges();
					}
				}
			}
		});
	},

	exportAction : function(self) {
		this.pocket.lister.master().writer({enableLoadMask:true});
	},
});
