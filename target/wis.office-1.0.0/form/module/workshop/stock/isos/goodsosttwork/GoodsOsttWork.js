Ext.define('module.workshop.stock.isos.goodsosttwork.GoodsOsttWork', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.OrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.WrhsPopup'
	],
	models	: [
		'module.workshop.stock.isos.goodsosttwork.model.GoodsOsttWorkMaster1',
		'module.workshop.stock.isos.goodsosttwork.model.GoodsOsttWorkDetail1'
	],
	stores	: [
		'module.workshop.stock.isos.goodsosttwork.store.GoodsOsttWorkMaster1',
		'module.workshop.stock.isos.goodsosttwork.store.GoodsOsttWorkDetail1'
	],
	views	: [
		'module.workshop.stock.isos.goodsosttwork.view.GoodsOsttWorkLayout',
		'module.workshop.stock.isos.goodsosttwork.view.GoodsOsttWorkListerMaster1',
		'module.workshop.stock.isos.goodsosttwork.view.GoodsOsttWorkListerDetail1',
		'module.workshop.stock.isos.goodsosttwork.view.GoodsOsttWorkSearch',
		'module.workshop.stock.isos.goodsosttwork.view.GoodsOsttWorkItemPopup',
		'module.workshop.stock.isos.goodsosttwork.view.GoodsOsttWorkItem2Popup'
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-goodsosttwork-layout #mainpanel'						: { tabchange : me.mainTabChange	},
			'module-goodsosttwork-layout button[action=selectAction]'		: { click : me.selectAction			},	// 조회
			// lister1 event
			'module-goodsosttwork-lister-master1 button[action=printAction]' : { click : me.printAction			},	// 거래명세서출력
			'module-goodsosttwork-lister-master1 button[action=exportAction]': { click : me.exportAction		},	// 엑셀
			'module-goodsosttwork-lister-master1 button[action=deleteAction]': { click : me.deleteAction		},	// 삭제
//			//lister serch
			'module-goodsosttwork-lister-detail1 button[action=exportAction]': { click : me.exportDetailAction	},	// 엑셀
			'module-goodsosttwork-lister-master2 button[action=exportAction]': { click : me.exportAction1		},	// 엑셀
			'module-goodsosttwork-lister-master2 button[action=PrintAction1]': { click : me.printAction1		},	// 부품식별표 발행
			'module-goodsosttwork-lister-detail2 button[action=exportAction]': { click : me.exportDetailAction1	},	// 엑셀
			'module-goodsosttwork-lister-master1' : {
				itemdblclick : me.selectLister1 ,
				selectionchange : me.attachRecord
			},
		});
		me.callParent(arguments);
	},

	pocket  : {
		layout			: function () { return Ext.ComponentQuery.query('module-goodsosttwork-layout') [0] },
		search			: function () { return Ext.ComponentQuery.query('module-goodsosttwork-search') [0] },
		listermaster1	: function () { return Ext.ComponentQuery.query('module-goodsosttwork-lister-master1')[0] },
		listermaster2	: function () { return Ext.ComponentQuery.query('module-goodsosttwork-lister-master2')[0] },
		listerdetail1	: function () { return Ext.ComponentQuery.query('module-goodsosttwork-lister-detail1')[0] },
		listerdetail2	: function () { return Ext.ComponentQuery.query('module-goodsosttwork-lister-detail2')[0] },
	},

	//조회
	selectAction : function() {
		var me = this,
			master1  = me.pocket.listermaster1(),
			master2  = me.pocket.listermaster2(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		if(param.work_strt_dttm1>param.work_strt_dttm2) {
			Ext.Msg.alert("알림", "조회기간을 다시 입력해주십시오.");
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			if ( tindex == 0 ) {
				master1.select({
					callback:function(records, operation, success) {
						if (success) {
							master1.getSelectionModel().select(0);
						} else { }
						mask.hide();
					}, scope:me
				}, Ext.merge( param, {stor_id : _global.stor_id}));
			}
		}
	},

	dateFormat:function(date){
		var	yyyy,
			mm  ,
			dd  ,
			value = ""
		;
		if(date.length==8){
			yyyy = date.substr(0,4),
			mm =  date.substr(4,2),
			dd = date.substr(6,2)
			value = yyyy+'-'+mm+'-'+dd
		}
		return value;
	},

	selectLister1:function( grid, record ){
		var me = this,
			master = me.pocket.listermaster1(),
			detail = me.pocket.listerdetail1(),
			record = master.getSelectionModel().getSelection()[0]
		;
		detail.select({
			 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
		}, { invc_numb : record.get('invc_numb') });
	},

	selectLister2:function( grid, record ){
		var me = this,
			master = me.pocket.listermaster2(),
			detail = me.pocket.listerdetail2(),
			record = master.getSelectionModel().getSelection()[0]
		;
		detail.select({
			 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
		}, { invc_numb : record.get('invc_numb') });
	},

	attachRecord:function( grid, records ){
		var me = this,
			listerdetail1 = me.pocket.listerdetail1()
		;
		listerdetail1.getStore().clearData();
		listerdetail1.getStore().loadData([],false);
	},

	mainTabChange : function(tabPanel, newCard, oldCard) {
		var me = this,
			master1		= me.pocket.listermaster1(),
			master2		= me.pocket.listermaster2(),
			search		= me.pocket.search(),
			param		= search.getValues(),
			tindex		= tabPanel.items.indexOf(newCard)
		;

		if(tindex == 0){
			me.pocket.search().down('[name=collapsed]').expand();
			master1.select({
				callback:function(records, operation, success) {
					if (success) {
						master1.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}else if(tindex == 1){
			me.pocket.search().down('[name=collapsed]').expand();
			master2.select({
				callback:function(records, operation, success) {
					if (success) {
						master2.getSelectionModel().select(0);
					} else { }
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}));
		}
	},


	deleteAction : function() {
		var me = this,
			lister = me.pocket.listermaster1(),
			detail = me.pocket.listerdetail1(),
			store  = lister.getStore(),
			select = lister.getSelectionModel().getSelection()[0],
			record = []
		;


		if(!select){
			Ext.Msg.alert("알림", "삭제하실 출고건을 선택하여 주십시오.");
		}else{
			Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
				if (button == 'yes') {
					var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
					mask.show();
					Ext.Ajax.request({
						url		: _global.location.http() + '/workshop/stock/isos/goodsosttwork/set/deleteMaster.do',
						params	: {
							token : _global.token_id,
							param : JSON.stringify({
								stor_id		: _global.stor_id,
								hqof_idcd	: _global.hqof_idcd,
								invc_numb	: select.get('invc_numb'),
								acpt_numb	: select.get('acpt_numb')
							})
						},
						async	: false,
						method	: 'POST',
						success	: function(response, request) {
							var result = Ext.decode(response.responseText);
							Ext.Msg.alert("알림", "삭제가 완료 되었습니다.");
							lister.getStore().reload();
							if	(!result.success ){
								Ext.Msg.error(result.message );
								return;
							} else {
								me.setResponse( {success : true , values :  values });
							}
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
	},

	// 거래명세서출력
	printAction:function() {
		var me = this,
			listermaster1 = me.pocket.listermaster1(),
			select = me.pocket.listermaster1().getSelectionModel().getSelection(),
			jrf = _global.options.rsvd_ordr_spts
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = listermaster1.getSelectionModel().getSelection();
		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "목록에서 선택하여주십시오.");
			return;
		}

		Ext.Ajax.request({
			url		: _global.location.http() + '/stock/goodsosttwork/get/insp.do',
			params	: {
			token	: _global.token_id,
			param	: JSON.stringify({
					cstm_idcd		: records[0].get('cstm_idcd'),
					rprt_dvcd		: "1000"
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					Ext.Msg.error(result.message );
					return;
				} else{
					if(result.records.length >0){
						console.log(jrf);
						jrf = result.records[0].rprt_file_name;
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		if(jrf){
			jrf = 'Invoice_workshop.jrf';
		}
		var invc_numb = select[0].get('invc_numb')
		var arg = 'invc_numb~'+invc_numb+'~';

		if(resId == 'N1000NBOLT'){
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+'invoice3.jrf'+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		}else{
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		}
		var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
		return win;
	},

	// 광일테크 부품식별표 출력
	printAction1 : function() {
		var me = this,
			listermaster2  = me.pocket.listermaster2(),
			listerdetail2  = me.pocket.listerdetail2(),
			select = listerdetail2.getSelectionModel().getSelection(),
			master = listermaster2.getSelectionModel().getSelection(),
			cstm_idcd = '',
			dvcd = '',
			widget
		;
		if (!select || select.length == 0) {
			Ext.Msg.alert("알림", '대기내역을 선택하여 주시기 바랍니다.' );
			return;
		}else{
			cstm_idcd = master[0].data.cstm_idcd;
			if(cstm_idcd.trim() == 'KUM01'){
				dvcd = 'kumho';
				widget = 'module-goodsosttwork-item2-popup';
			}else{
				widget = 'module-goodsosttwork-item-popup';
			}

			resource.loadPopup({
				widget :  widget,
				param : {
					invc_numb : select[0].data.invc_numb,
					line_seqn : select[0].data.line_seqn,
					trst_qntt : select[0].data.trst_qntt,
					dvcd      : dvcd
				}
			});
		}
	},


	// 엑셀
	exportAction : function(self) {
		this.pocket.listermaster1().writer({enableLoadMask:true});
	},
	exportDetailAction : function(self) {
		this.pocket.listerdetail1().writer({enableLoadMask:true});
	},
	exportAction1 : function(self) {
		this.pocket.listermaster2().writer({enableLoadMask:true});
	},
	exportDetailAction1 : function(self) {
		this.pocket.listerdetail2().writer({enableLoadMask:true});
	},
});