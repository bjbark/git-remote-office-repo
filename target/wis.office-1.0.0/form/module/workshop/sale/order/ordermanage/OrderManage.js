 Ext.define('module.workshop.sale.order.ordermanage.OrderManage', { extend:'Axt.app.Controller',

	requires: [
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.CvicPopup',
		'Axt.popup.view.ZipcodeSearch',
		'lookup.popup.view.ItemClassPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.MmbrPopup',
		'lookup.popup.view.ShetPopup',
		'lookup.popup.view.HdcoPopup',
		'lookup.popup.view.ShetItemPopup',
		'lookup.popup.view.EstiPricPopup',
	],
	models	: [
	    'module.workshop.sale.order.ordermanage.model.OrderManage'
	],
	stores	: [
		'module.workshop.sale.order.ordermanage.store.OrderManage'
	],
	views	: [
		'module.workshop.sale.order.ordermanage.view.OrderManageLayout',
		'module.workshop.sale.order.ordermanage.view.OrderManageSearch',
		'module.workshop.sale.order.ordermanage.view.OrderManageLister',
		'module.workshop.sale.order.ordermanage.view.WorkPopup',
		'module.workshop.sale.order.ordermanage.view.ReleasePopup',
		'module.workshop.sale.order.ordermanage.view.PlanPopup',
		'module.workshop.sale.order.ordermanage.view.PlanPopup2'

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		/* 사용자타입에 따라 searchAction()이 유동적으로 움직여야 할 때 사용 >> 현재는 autoLoad 사용 */
		me.control({
			// layout event
			'module-ordermanage-layout button[action=selectAction]'			: { click : me.selectAction },	// 조회
			// editer event
			'module-ordermanage-editor button[action=updateAction]'			: { click : me.updateAction },	// 저장
			'module-ordermanage-editor button[action=cancelAction]'			: { click : me.cancelAction },	// 취소
			// lister event
			'module-ordermanage-lister button[action=ReleaseAction]'		: { click : me.ReleaseAction      }, /* 출고지시 */
			'module-ordermanage-lister button[action=ReleaseCancelAction]'	: { click : me.ReleaseCancelAction}, /* 출고취소 */
			'module-ordermanage-lister button[action=code_ini]'				: { click : me.copyAction },	// 수정
			'module-ordermanage-lister button[action=modifyAction]'			: { click : me.modifyAction },	// 수정
			'module-ordermanage-lister button[action=PlanAction2]'			: { click : me.PlanAction2 },	// 생산계획
			'module-ordermanage-lister button[action=planAction]'			: { click : me.planAction },	// 생산지시
			'module-ordermanage-lister button[action=exportAction]'			: { click : me.exportAction },	// 엑셀

			// lister event
			'module-ordermanage-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			},
			'module-ordermanage-plan-lister' : {
				selectionchange: me.selectRecord2												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},

	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-ordermanage-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-ordermanage-search')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-ordermanage-editor')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-ordermanage-lister')[0] },
		plan : function () { return Ext.ComponentQuery.query('module-ordermanage-plan-lister')[0] },
		popup : function () { return Ext.ComponentQuery.query('module-ordermanage-release-popup')[0] },
//		popup3 : function () { return Ext.ComponentQuery.query('module-ordermanage-release-popup')[0] },
//		popup2 : function () { return Ext.ComponentQuery.query('module-ordermanage-plan-popup')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else { me.pocket.popup().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//선택
	selectRecord:function( grid, record ){
		var me = this;
	},

	//선택
	selectRecord2 :function( grid, record ){
		var	me    = this,
			popup = me.pocket.popup(),
			popup3 = me.pocket.popup3(),
			select = me.pocket.lister().getSelectionModel().getSelection()[0];
		;
		var form,form2;
		console.log(record[0]);
		console.log(popup);
		if(popup){
			form = popup.down('form');
			form.loadRecord(record[0]);
		}
		if(popup3){
			form2 = popup3.down('form');
			form2.loadRecord(select);
		}
	},



	itemInputAction:function() {
		var me = this
		;
		resource.loadPopup({
			widget : 'module-clntcode-input-popup'
		});
	},

		planAction:function() {
			var me		= this,
			lister	= me.pocket.lister(),
			select	= lister.getSelectionModel().getSelection()[0],
			popup  = me.pocket.popup(),
			records = lister.getSelectionModel().getSelection();
			plan	= ""
		;

			if(select.get('acpt_stat_dvcd')=="0020"){
				Ext.Msg.alert('알림','이미 생산지시된 내역입니다.');
				return;
			}
			if(select){
			var popup = resource.loadPopup({
				widget : 'module-ordermanage-plan-popup',
				params : {
				invc_numb : select.get('invc_numb'),
				},
			});
			var form = popup.down('form');


			form.getForm().setValues(records[0].data);
		}else{
			Ext.Msg.alert('알림','지시할 주문내역을 선택해주세요.');
		}
	},

	PlanAction2:function() {
		var me		= this,
			lister	= me.pocket.lister(),
			select	= lister.getSelectionModel().getSelection()[0],
			popup	= me.pocket.popup(),
			records	= lister.getSelectionModel().getSelection();
			plan	= ""
		;


		if(select){
		var popup = resource.loadPopup({
			widget : 'module-ordermanage-plan-popup2',
			params : {
			invc_numb : select.get('invc_numb'),
			},
		});

		var form = popup.down('form');


			form.getForm().setValues(records[0].data);
		}else{
			Ext.Msg.alert('알림','지시할 주문내역을 선택해주세요.');
		}
	},


	ReleaseAction:function() {
		var me = this,
		lister	= me.pocket.lister(),
		select	= lister.getSelectionModel().getSelection()[0],
		select2	= me.pocket.lister().getSelectionModel().getSelection()[0],
		popup  = me.pocket.popup(),
		record	= lister.getSelectionModel().getSelection(),
		err_msg = "",
		checked	= 0,
		param	=''
	;
		var records = lister.getSelectionModel().getSelection();

		if(select){
			if (select && select.length != 0) {
				Ext.each(select, function(records) {
					if (select2.get("acpt_stat_dvcd") == "0600") {
						err_msg = "출고가 되있는 상태입니다.";
					}
				});

				if (err_msg != "") {
					Ext.Msg.alert("알림", err_msg);
					return;
				}
			}

			if(!records || records.length<1){
				Ext.Msg.alert("알림","출고등록할 내역을 선택해주십시오.");
				return;
			}else{
				var popup = resource.loadPopup({
					widget : 'module-ordermanage-release-popup',
				});
				var numb = Ext.ComponentQuery.query('#invc_numb')[0].setValue(record[0].data.invc_numb);
			}
		}else{
			Ext.Msg.alert('알림','출고등록할 내역을 선택해주세요.');
		}
	},

	//출고취소
//	ReleaseCancelAction:function() {
//		var me	= this,
//		master	= me.pocket.lister(),
//		select	= me.pocket.lister().getSelectionModel().getSelection(),
//		select2	= me.pocket.lister().getSelectionModel().getSelection()[0],
//		record	= master.getSelectionModel().getSelection(),
//		popup	= me.pocket.popup(),
//		param	='',
//		checked	= 0
//		;
//		var err_msg = "";
//		var records = master.getSelectionModel().getSelection();
//
//
//		if (select && select.length != 0) {
//			Ext.each(select, function(record) {
//				if (select2.get("line_clos") == "1") {
//					err_msg = "마감된 수주입니다 기능을 활성화시키려면 마감해지해주십시오.";
//				}
//			});
//
//			if (err_msg != "") {
//				Ext.Msg.alert("알림", err_msg);
//				return;
//			}
//		}
//
//		if (select && select.length != 0) {
//			Ext.each(select, function(record) {
//				if (select2.get("acpt_stat_dvcd") == "0011") {
//					err_msg = " 출고가 안된상태입니다.";
//				}
//			});
//
//			if (err_msg != "") {
//				Ext.Msg.alert("알림", err_msg);
//				return;
//			}
//		}
//
//		for(var i=0;i <records.length;i++){
//			if(records[0].get('invc_date')!=records[i].get('invc_date')){
//				Ext.Msg.alert("알림","수주일자가 같은 수주목록을 선택해주십시오.");
//				checked = 1
//				return;
//			}
//		}
//
//		if(!records || records.length<1){
//			Ext.Msg.alert("알림","출고취소할 수주목록을 선택해주십시오.");
//			return;
//		}else{
//			for(var i=0;i <records.length;i++){
////				if(records[0].get('cstm_idcd')!=records[i].get('cstm_idcd')){
////					Ext.Msg.alert("알림","거래처명이 같은 수주목록을 선택해주십시오.");
////					checked = 1
////					return;
////				}
//			}if(!checked){
//				var a =[];
//
//				for(var i =0; i< record.length ; i++){
//					a.push({invc_numb : record[i].get('invc_numb')});
//				}
//				param = JSON.stringify({
//						records		: a
//					});
//				Ext.Msg.confirm("확인", "출고취소 하시겠습니까?", function(button) {
//					if (button == 'yes') {
//						Ext.Ajax.request({
//							url		: _global.location.http() + '/workshop/sale/order/ordermanage/set/releasecancel.do',
//							method		: "POST",
//							params		: {
//								token	: _global.token_id,
//								param	: Ext.encode({
//									param		: param,
//									stor_id		: _global.stor_id,
//									hqof_idcd	: _global.hqof_idcd
//								})
//							},
//							async	: false,
//							method	: 'POST',
//							success	: function(response, request) {
//								var result = Ext.decode(response.responseText);
//								if	(!result.success ){
//									Ext.Msg.error(result.message );
//									return;
//								} else {
//									var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
//									mask.show();
//									master.select({
//										 callback : function(records, operation, success) {
//											if (success) {
//											} else {}
//											mask.hide();
//										}, scope : me
//									});
//									me.hide();
//								}
//								Ext.Msg.alert("알림", "출고취소가 완료 되었습니다.");
//								master.getStore().reload();
//							},
//							failure : function(result, request) {
//							},
//							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//								mask.hide();
//							}
//						});
//					}
//				});
//			}
//		}
//	},

	//취소
	cancelAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
				me.pocket.layout().down('#mainpanel').setDisabled(false);
				me.pocket.search().setDisabled(false);
			}
		}, me);
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});