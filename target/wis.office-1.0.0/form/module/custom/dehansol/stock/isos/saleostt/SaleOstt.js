Ext.define('module.custom.dehansol.stock.isos.saleostt.SaleOstt', { extend : 'Axt.app.Controller',

	requires:[

	],

	models:[
		'module.custom.dehansol.stock.isos.saleostt.model.SaleOsttMaster',
	],
	stores:[
		'module.custom.dehansol.stock.isos.saleostt.store.SaleOsttMaster',
	],
	views : [
		'module.custom.dehansol.stock.isos.saleostt.view.SaleOsttLayout',
		/* 현황 */
		'module.custom.dehansol.stock.isos.saleostt.view.SaleOsttSearch',
		'module.custom.dehansol.stock.isos.saleostt.view.SaleOsttListerMaster',
		'module.custom.dehansol.stock.isos.saleostt.view.SaleOsttListerSearch',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-saleostt-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 */
			'module-saleostt-layout #mainpanel'										: { tabchange : me.mainTabChange  },

			'module-saleostt-lister-master button[action=ReleaseAction]'			: { click : me.ReleaseAction      }, /* 출고지시 */
			'module-saleostt-lister-master button[action=ReleaseCancelAction]'		: { click : me.ReleaseCancelAction}, /* 출고취소 */
			'module-saleostt-lister-search button[action=selectAction2]'			: { click : me.selectAction2      }, /* 바코드조회 */



		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-saleostt-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-saleostt-search')[0] },
		lister : {
			master  : function () { return Ext.ComponentQuery.query('module-saleostt-lister-master')[0] },
			search  : function () { return Ext.ComponentQuery.query('module-saleostt-lister-search')[0] }
		},
		popup : function () { return Ext.ComponentQuery.query('module-saleorder-copy-popup')[0] },
	},

	selectAction:function(callbackFn) {
		Ext.Msg.alert("알림","수주현황의 조회를 클릭 해 주십시오.");
	},

	selectAction2 : function() {
		var me = this,
			lister = me.pocket.lister.master(),
			search = me.pocket.lister.search(),
			param  = search.getValues()
		;

		if(param.barcode_pono == null || param.barcode_pono == ''){
			Ext.Msg.alert("알림","바코드를 스캔해주십시오.");
			return;
		}

		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(records);
				} else { }
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id, hq_id : _global.hq_id}) );

	},

	//출고지시
	ReleaseAction:function() {
		var me	= this,
		master	= me.pocket.lister.master(),
		select	= me.pocket.lister.master().getSelectionModel().getSelection(),
		select2	= me.pocket.lister.master().getSelectionModel().getSelection()[0],
		record	= master.getSelectionModel().getSelection(),
		popup	= me.pocket.popup(),
		param	='',
		checked	= 0
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();


		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (select2.get("line_clos") == "1") {
					err_msg = "마감된 수주입니다 기능을 활성화시키려면 마감해지해주십시오.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}

		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (select2.get("acpt_stat_dvcd") == "0600") {
					err_msg = "출고가 되있는 상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}

		for(var i=0;i <records.length;i++){
			if(records[0].get('invc_date')!=records[i].get('invc_date')){
				Ext.Msg.alert("알림","수주일자가 같은 수주목록을 선택해주십시오.");
				checked = 1
				return;
			}
		}

		if(!records || records.length<1){
			Ext.Msg.alert("알림","출고할 수주목록을 선택해주십시오.");
			return;
		}else{
			for(var i=0;i <records.length;i++){
				if(records[0].get('cstm_idcd')!=records[i].get('cstm_idcd')){
					Ext.Msg.alert("알림","거래처명이 같은 수주목록을 선택해주십시오.");
					checked = 1
					return;
				}
			}if(!checked){
				var a =[];

				for(var i =0; i< record.length ; i++){
					a.push({invc_numb : record[i].get('invc_numb'),line_seqn : record[i].get('line_seqn')});
				}
				param = JSON.stringify({
						cstm_idcd	: select2.data.cstm_idcd,
						ostt_date	: select2.data.invc_date.replace(/-/gi,""),
						records		: a
					});
				Ext.Msg.confirm("확인", "출고지시 하시겠습니까?", function(button) {
					if (button == 'yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/custom/dehansol/stock/isos/saleostt/set/release.do',
							method		: "POST",
							params		: {
								token	: _global.token_id,
								param	: Ext.encode({
									param		: param,
									stor_id		: _global.stor_id,
									hqof_idcd	: _global.hqof_idcd
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
									var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
									mask.show();
									master.select({
										 callback : function(records, operation, success) {
											if (success) {
											} else {}
											mask.hide();
										}, scope : me
									});
									me.hide();
								}
								Ext.Msg.alert("알림", "출고작성이 완료 되었습니다.");
								master.getStore().reload();
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								mask.hide();
							}
						});
					}
				});
			}
		}
	},

	//출고취소
	ReleaseCancelAction:function() {
		var me	= this,
		master	= me.pocket.lister.master(),
		select	= me.pocket.lister.master().getSelectionModel().getSelection(),
		select2	= me.pocket.lister.master().getSelectionModel().getSelection()[0],
		record	= master.getSelectionModel().getSelection(),
		popup	= me.pocket.popup(),
		param	='',
		checked	= 0
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();


		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (select2.get("line_clos") == "1") {
					err_msg = "마감된 수주입니다 기능을 활성화시키려면 마감해지해주십시오.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}

		if (select && select.length != 0) {
			Ext.each(select, function(record) {
				if (select2.get("acpt_stat_dvcd") == "0011") {
					err_msg = " 출고가 안된상태입니다.";
				}
			});

			if (err_msg != "") {
				Ext.Msg.alert("알림", err_msg);
				return;
			}
		}

		for(var i=0;i <records.length;i++){
			if(records[0].get('invc_date')!=records[i].get('invc_date')){
				Ext.Msg.alert("알림","수주일자가 같은 수주목록을 선택해주십시오.");
				checked = 1
				return;
			}
		}

		if(!records || records.length<1){
			Ext.Msg.alert("알림","출고취소할 수주목록을 선택해주십시오.");
			return;
		}else{
			for(var i=0;i <records.length;i++){
				if(records[0].get('cstm_idcd')!=records[i].get('cstm_idcd')){
					Ext.Msg.alert("알림","거래처명이 같은 수주목록을 선택해주십시오.");
					checked = 1
					return;
				}
			}if(!checked){
				var a =[];

				for(var i =0; i< record.length ; i++){
					a.push({invc_numb : record[i].get('invc_numb')});
				}
				param = JSON.stringify({
						records		: a
					});
				Ext.Msg.confirm("확인", "출고취소 하시겠습니까?", function(button) {
					if (button == 'yes') {
						Ext.Ajax.request({
							url		: _global.location.http() + '/custom/dehansol/stock/isos/saleostt/set/releasecancel.do',
							method		: "POST",
							params		: {
								token	: _global.token_id,
								param	: Ext.encode({
									param		: param,
									stor_id		: _global.stor_id,
									hqof_idcd	: _global.hqof_idcd
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
									var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
									mask.show();
									master.select({
										 callback : function(records, operation, success) {
											if (success) {
											} else {}
											mask.hide();
										}, scope : me
									});
									me.hide();
								}
								Ext.Msg.alert("알림", "출고취소가 완료 되었습니다.");
								master.getStore().reload();
							},
							failure : function(result, request) {
							},
							callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								mask.hide();
							}
						});
					}
				});
			}
		}
	},


});
