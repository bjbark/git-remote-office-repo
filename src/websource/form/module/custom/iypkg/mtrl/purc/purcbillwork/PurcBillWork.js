Ext.define('module.custom.iypkg.mtrl.purc.purcbillwork.PurcBillWork', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.IypkgOrdrPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.ProdPopup',
		'module.custom.iypkg.mtrl.purc.purcbillwork.view.TxblPopup',
		'module.custom.iypkg.mtrl.purc.purcbillwork.view.TxblPopup2',
		'module.custom.iypkg.mtrl.purc.purcbillwork.view.TxblPopup3'
	],

	models:[
		'module.custom.iypkg.mtrl.purc.purcbillwork.model.PurcBillWork',
		'module.custom.iypkg.mtrl.purc.purcbillwork.model.PurcBillWork2',
		'module.custom.iypkg.mtrl.purc.purcbillwork.model.PurcBillWork4',
		'module.custom.iypkg.mtrl.purc.purcbillwork.model.PurcBillWork5',
	],
	stores:[
		'module.custom.iypkg.mtrl.purc.purcbillwork.store.PurcBillWorkLister',
		'module.custom.iypkg.mtrl.purc.purcbillwork.store.PurcBillWorkMaster',
		'module.custom.iypkg.mtrl.purc.purcbillwork.store.PurcBillWorkDetail',
		'module.custom.iypkg.mtrl.purc.purcbillwork.store.PurcBillWorkLister3',
		'module.custom.iypkg.mtrl.purc.purcbillwork.store.PurcBillWorkLister4',
		'module.custom.iypkg.mtrl.purc.purcbillwork.store.PurcBillWorkLister5',
	],
	views : [
		'module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkLayout',
		'module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkSearch',
		'module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkWorkerSearch',
		'module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkWorkerSearch2',
		'module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkWorkerSearch3',
		'module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkWorkerLister2Search',
		'module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkWorkerLister2Search2',
		/* 작업 */
		'module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkLister',
		'module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkLister2Master',
		'module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkLister2Detail',
		'module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkLister3',
		'module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkLister4',
		'module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkLister5',
		'module.custom.iypkg.mtrl.purc.purcbillwork.view.PurcBillWorkPayPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-purcbillwork-layout #mainpanel'										: { tabchange : me.selectAction		},
			'module-purcbillwork-layout button[action=selectAction]'					: { click : me.selectAction       }, /* 조회 		*/
			'module-purcbillwork-lister button[action=txblAction]'						: { click : me.txblAction         }, /* 팝업띄우기	*/
			'module-purcbillwork-lister3 button[action=txblAction2]'					: { click : me.txblAction2        }, /* 팝업띄우기	*/
			'module-purcbillwork-lister5 button[action=txblAction3]'					: { click : me.txblAction3        }, /* 팝업띄우기	*/
			'module-purcbillwork-popup  button[action=updateAction]'					: { click : me.updateAction       }, /* 저장		*/
			'module-purcbillwork-popup2 button[action=updateAction]'					: { click : me.updateAction2      }, /* 저장		*/
			'module-purcbillwork-popup3 button[action=updateAction]'					: { click : me.updateAction3      }, /* 저장		*/
			'module-purcbillwork-lister2-detail  button[action=exportAction]'			: { click : me.exportAction       }, /* 엑셀		*/
			'module-purcbillwork-lister4 button[action=exportAction]'					: { click : me.exportAction2      }, /* 엑셀		*/
			'module-purcbillwork-lister2-master button[action=payAction]'				: { click : me.payAction          }, /* 지급		*/
			'module-purcbillwork-lister2-master' : {
				itemdblclick    : me.selectDetail,
			}

		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-purcbillwork-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-purcbillwork-search')[0] },
		popup  : function () { return Ext.ComponentQuery.query('module-purcbillwork-popup')[0] },
		popup2 : function () { return Ext.ComponentQuery.query('module-purcbillwork-popup2')[0] },
		popup4 : function () { return Ext.ComponentQuery.query('module-purcbillwork-popup3')[0] },
		popup3 : function () { return Ext.ComponentQuery.query('module-purcbillwork-pay-popup')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-purcbillwork-lister')[0] },
		lister3: function () { return Ext.ComponentQuery.query('module-purcbillwork-lister3')[0] },
		lister4: function () { return Ext.ComponentQuery.query('module-purcbillwork-lister4')[0] },
		lister5: function () { return Ext.ComponentQuery.query('module-purcbillwork-lister5')[0] },
		master : function () { return Ext.ComponentQuery.query('module-purcbillwork-lister2-master')[0] },
		detail : function () { return Ext.ComponentQuery.query('module-purcbillwork-lister2-detail')[0] },
		listersearch : function () { return Ext.ComponentQuery.query('module-purcbillwork-worker-search')[0] },
		mastersearch : function () { return Ext.ComponentQuery.query('module-purcbillwork-worker-lister2-search')[0] },
		detailsearch : function () { return Ext.ComponentQuery.query('module-purcbillwork-worker-lister2-search2')[0] },
		lister4search : function () { return Ext.ComponentQuery.query('module-purcbillwork-worker-search2')[0] },
		lister5search : function () { return Ext.ComponentQuery.query('module-purcbillwork-worker-search3')[0] },
	},

	//조회
	selectAction:function(callbackFn) {
		var me = this,
			lister	= me.pocket.lister(),
			master	= me.pocket.master(),
			lister4	= me.pocket.lister4(),
			lister5	= me.pocket.lister5(),
			search	= me.pocket.search(),
			search1	= me.pocket.listersearch(),
			search2	= me.pocket.mastersearch(),
			search4	= me.pocket.lister4search(),
			search5	= me.pocket.detailsearch(),
			search6	= me.pocket.lister5search(),
			param	= search1.getValues(),
			param2	= search2.getValues(),
			param4	= search4.getValues(),
			param5	= search6.getValues(),
			detail	= me.pocket.detail(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		if(tindex==0){
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge(param, { stor_grp : _global.stor_grp, find_name : search.getValues().find_name }));
		}else if(tindex==1){
			detail.getStore().clearData();
			detail.getStore().loadData([],false);

			search5.getForm().reset();

			mask.show();
			master.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge(param2, { stor_grp : _global.stor_grp }));
		}else if(tindex==4){
			mask.show();
			lister4.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge(param4, { stor_grp : _global.stor_grp }));
		}else if(tindex==3){
			mask.show();
			lister5.select({
				callback:function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge(param5, { stor_grp : _global.stor_grp }));
		}
	},


	//디테일조회
	selectDetail : function(grid, record) {
		var me = this,
			master	= me.pocket.master(),
			detail	= me.pocket.detail(),
			search	= me.pocket.detailsearch()
		;

		search.loadRecord(record);
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			}, { invc_numb : record.get('invc_numb') });
		}
	},

	//매입계산서발행
	txblAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			changes= lister.getStore().getUpdatedRecords().length,
			offr_path_dvcd, txbl_path_dvcd,
			sum_sply_amnt = 0,
			sum_vatx_amnt = 0,
			sum_ttsm_amnt = 0
		;
		for (var i = 0; i < changes; i++) {
			if(lister.getStore().getUpdatedRecords()[0].data.offr_path_dvcd != lister.getStore().getUpdatedRecords()[i].data.offr_path_dvcd){
				Ext.Msg.alert("알림","자료구분이 동일한 품목을 선택해주십시오.");
				return;
			}else if(lister.getStore().getUpdatedRecords()[0].data.cstm_idcd != lister.getStore().getUpdatedRecords()[i].data.cstm_idcd){
				Ext.Msg.alert("알림","매입처가 동일한 품목을 선택해주십시오.");
				return;
			}else{
				sum_sply_amnt = sum_sply_amnt + Math.floor(lister.getStore().getUpdatedRecords()[i].data.istt_amnt);
				sum_vatx_amnt = sum_vatx_amnt + Math.floor(lister.getStore().getUpdatedRecords()[i].data.istt_vatx);
				sum_ttsm_amnt = sum_ttsm_amnt + Math.floor(lister.getStore().getUpdatedRecords()[i].data.ttsm_amnt);
			}
		}

		offr_path_dvcd = lister.getStore().getUpdatedRecords()[0].data.offr_path_dvcd;

		if(offr_path_dvcd == '1'){
			txbl_path_dvcd = '11'
		}else if(offr_path_dvcd == '2'){
			txbl_path_dvcd = '14'
		}else if(offr_path_dvcd == '3'){
			txbl_path_dvcd = '12'
		}

		if(changes == 0){
			Ext.Msg.alert("알림","발행할 수량을 입력해주십시오.");
			return;
		}
		resource.loadPopup({
			widget : 'module-purcbillwork-popup',
			params : {
				stor_id		: _global.stor_id,
				cstm_idcd	: lister.getStore().getUpdatedRecords()[0].data.cstm_idcd,
				cstm_name	: lister.getStore().getUpdatedRecords()[0].data.cstm_name,
				txbl_path_dvcd	: txbl_path_dvcd,
				sum_sply_amnt	: sum_sply_amnt,
				sum_vatx_amnt	: sum_vatx_amnt,
				sum_ttsm_amnt	: sum_ttsm_amnt
			},
		});
	},

	//기타매입계산서발행
	txblAction2:function() {
		var me = this,
			lister = me.pocket.lister3(),
			store  = lister.getStore(),
			record = lister.getStore().data.items,
			changes= lister.getStore().data.items.length,
			sum_sply_amnt = 0,
			sum_vatx_amnt = 0,
			sum_ttsm_amnt = 0
		;

		if(changes == 0){
			Ext.Msg.alert("알림","등록할 품목을 입력해주십시오.");
			return;
		}

		for (var j = 0; j < changes; j++) {
			if(record[j].data.item_name == ''){
				Ext.Msg.alert("알림","품명을 입력해주십시오.");
				return;
			}else{
				sum_sply_amnt = sum_sply_amnt + Math.floor(record[j].data.istt_amnt);
				sum_vatx_amnt = sum_vatx_amnt + Math.floor(record[j].data.istt_vatx);
				sum_ttsm_amnt = sum_ttsm_amnt + Math.floor(record[j].data.ttsm_amnt);
			}
		}

		resource.loadPopup({
			widget : 'module-purcbillwork-popup2',
			params : {
				sum_sply_amnt	: sum_sply_amnt,
				sum_vatx_amnt	: sum_vatx_amnt,
				sum_ttsm_amnt	: sum_ttsm_amnt
			},
		});
	},

	//외주매입계산서발행
	txblAction3:function() {
		var me = this,
			lister = me.pocket.lister5(),
			changes= lister.getStore().getUpdatedRecords().length,
			offr_path_dvcd, txbl_path_dvcd,
			sum_sply_amnt = 0,
			sum_vatx_amnt = 0,
			sum_ttsm_amnt = 0
		;
		for (var i = 0; i < changes; i++) {
			if(lister.getStore().getUpdatedRecords()[0].data.cstm_idcd != lister.getStore().getUpdatedRecords()[i].data.cstm_idcd){
				Ext.Msg.alert("알림","매입처가 동일한 품목을 선택해주십시오.");
				return;
			}else{
				sum_sply_amnt = sum_sply_amnt + Math.floor(lister.getStore().getUpdatedRecords()[i].data.istt_amnt);
				sum_vatx_amnt = sum_vatx_amnt + Math.floor(lister.getStore().getUpdatedRecords()[i].data.istt_vatx);
				sum_ttsm_amnt = sum_ttsm_amnt + Math.floor(lister.getStore().getUpdatedRecords()[i].data.ttsm_amnt);
			}
		}

		if(changes == 0){
			Ext.Msg.alert("알림","발행할 수량을 입력해주십시오.");
			return;
		}
		resource.loadPopup({
			widget : 'module-purcbillwork-popup3',
			params : {
				stor_id		: _global.stor_id,
				cstm_idcd	: lister.getStore().getUpdatedRecords()[0].data.cstm_idcd,
				cstm_name	: lister.getStore().getUpdatedRecords()[0].data.cstm_name,
				txbl_path_dvcd	: '15',
				sum_sply_amnt	: sum_sply_amnt,
				sum_vatx_amnt	: sum_vatx_amnt,
				sum_ttsm_amnt	: sum_ttsm_amnt
			},
		});
	},

	//저장
	updateAction: function(){
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.listersearch(),
			store  = lister.getStore(),
			popup  = me.pocket.popup(),
			values = popup.down('form').getValues(),
			changes= lister.getStore().getUpdatedRecords().length,
			record = lister.getStore().getUpdatedRecords(),
			new_invc_numb, new_line_seqn, yorn,
			purc_invc_numb	//매입대장 invoice 번호
		;

		Ext.Ajax.request({
			url			: _global.location.http() + '/listener/seq/maxid.do',
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id	: _global.stor_id,
					table_nm: 'txbl_mast'
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				new_invc_numb = result.records[0].seq;
			}
		});

		//매입대장에 같이 insert하기 위한 numb - 시퀀스는 txbl과 동일하게 쓰면됨.
		Ext.Ajax.request({
			url			: _global.location.http() + '/listener/seq/maxid.do',
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id	: _global.stor_id,
					table_nm: 'purc_mast'
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				purc_invc_numb = result.records[0].seq;
			}
		});

		var x = 1;	//순번
		for (var a = 0; a < changes; a++) {
			lister.getStore().getUpdatedRecords()[a].data.new_line_seqn = x++;
			lister.getStore().getUpdatedRecords()[a].data.new_invc_numb = new_invc_numb;
			lister.getStore().getUpdatedRecords()[a].data.purc_invc_numb = purc_invc_numb;
			lister.getStore().getUpdatedRecords()[a].data.publ_date = values.publ_date;
			lister.getStore().getUpdatedRecords()[a].data.txbl_volm = values.txbl_volm;
			lister.getStore().getUpdatedRecords()[a].data.txbl_honm = values.txbl_honm;
			lister.getStore().getUpdatedRecords()[a].data.txbl_seqn = values.txbl_seqn;
			lister.getStore().getUpdatedRecords()[a].data.stot_dvcd = values.stot_dvcd;
			lister.getStore().getUpdatedRecords()[a].data.rqod_rcvd_dvcd = values.rqod_rcvd_dvcd;
			lister.getStore().getUpdatedRecords()[a].data.txbl_cstm_idcd = values.txbl_cstm_idcd;
			lister.getStore().getUpdatedRecords()[a].data.txbl_cstm_name = values.txbl_cstm_name;
			lister.getStore().getUpdatedRecords()[a].data.txbl_path_dvcd = values.txbl_path_dvcd;
			lister.getStore().getUpdatedRecords()[a].data.sum_sply_amnt = values.sum_sply_amnt;
			lister.getStore().getUpdatedRecords()[a].data.sum_vatx_amnt = values.sum_vatx_amnt;
			lister.getStore().getUpdatedRecords()[a].data.sum_ttsm_amnt = values.sum_ttsm_amnt;
			lister.getStore().getUpdatedRecords()[a].data.remk_text = values.remk_text;
		}

		for (var i = 0; i < changes; i++) {
			if(record[i].data.txbl_path_dvcd == ''){
				Ext.Msg.alert("알림","세금계산서 구분을 선택하여주십시오.");
				return;
			}else if(record[i].data.txbl_seqn == ''){
				Ext.Msg.alert("알림","일련번호를 입력하여주십시오.");
				return;
			}else if(record[i].data.txbl_cstm_idcd == ''){
				Ext.Msg.alert("알림","매입처를 선택하여주십시오.");
				return;
			}else if(record[i].data.txbl_volm == ''){
				Ext.Msg.alert("알림","권/호를 입력하여 주십시오.");
				return;
			}else if(record[i].data.txbl_honm == ''){
				Ext.Msg.alert("알림","권/호를 입력하여 주십시오.");
				return;
			}
		}

		//일련번호 중복체크
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/iypkg/mtrl/purc/purcbillwork/get/txblSeqnCheck.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					txbl_seqn		: values.txbl_seqn
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
					if(result.records.length>0){
						yorn = result.records[0].success;
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});

		if(yorn == '1'){
			Ext.Msg.alert("알림","중복된 일련번호입니다.");
			return;
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			lister.getStore().sync({
				success : function(operation){
					search.getForm().reset(true);
					store.clearData();
					store.removeAll();
				},
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
					store.reload();
					popup.close();
				}
			});
		}
	},


	//저장2
	updateAction2: function(){
		var me = this,
			lister = me.pocket.lister3(),
			store  = lister.getStore(),
			record = lister.getStore().data.items,
			changes= lister.getStore().data.items.length,
			popup  = me.pocket.popup2(),
			values = popup.down('form').getValues(),
			new_invc_numb, new_line_seqn, yorn,
			purc_invc_numb	//매입대장 invoice 번호
		;

		Ext.Ajax.request({
			url			: _global.location.http() + '/listener/seq/maxid.do',
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id	: _global.stor_id,
					table_nm: 'txbl_mast'
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				new_invc_numb = result.records[0].seq;
			}
		});

		//매입대장에 같이 insert하기 위한 numb - 시퀀스는 txbl과 동일하게 쓰면됨.
		Ext.Ajax.request({
			url			: _global.location.http() + '/listener/seq/maxid.do',
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id	: _global.stor_id,
					table_nm: 'purc_mast'
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				purc_invc_numb = result.records[0].seq;
			}
		});

		var x = 1;	//순번
		for (var a = 0; a < changes; a++) {
			lister.getStore().data.items[a].data.new_line_seqn = x++;
			lister.getStore().data.items[a].data.new_invc_numb = new_invc_numb;
			lister.getStore().data.items[a].data.purc_invc_numb = purc_invc_numb;
			lister.getStore().data.items[a].data.publ_date = values.publ_date;
			lister.getStore().data.items[a].data.txbl_volm = values.txbl_volm;
			lister.getStore().data.items[a].data.txbl_honm = values.txbl_honm;
			lister.getStore().data.items[a].data.txbl_seqn = values.txbl_seqn;
			lister.getStore().data.items[a].data.stot_dvcd = values.stot_dvcd;
			lister.getStore().data.items[a].data.rqod_rcvd_dvcd = values.rqod_rcvd_dvcd;
			lister.getStore().data.items[a].data.txbl_cstm_idcd = values.txbl_cstm_idcd;
			lister.getStore().data.items[a].data.txbl_cstm_name = values.txbl_cstm_name;
			lister.getStore().data.items[a].data.sum_sply_amnt = values.sum_sply_amnt;
			lister.getStore().data.items[a].data.sum_vatx_amnt = values.sum_vatx_amnt;
			lister.getStore().data.items[a].data.sum_ttsm_amnt = values.sum_ttsm_amnt;
			lister.getStore().data.items[a].data.orig_invc_numb = '';
			lister.getStore().data.items[a].data.orig_invc_seqn = '';
			lister.getStore().data.items[a].data.remk_text = values.remk_text;
		}

		for (var i = 0; i < changes; i++) {
			if(record[i].data.txbl_seqn == ''){
				Ext.Msg.alert("알림","일련번호를 입력하여주십시오.");
				return;
			}else if(record[i].data.txbl_cstm_idcd == ''){
				Ext.Msg.alert("알림","매입처를 선택하여주십시오.");
				return;
			}else if(record[i].data.txbl_volm == ''){
				Ext.Msg.alert("알림","권/호를 입력하여 주십시오.");
				return;
			}else if(record[i].data.txbl_honm == ''){
				Ext.Msg.alert("알림","권/호를 입력하여 주십시오.");
				return;
			}
		}

		//일련번호 중복체크
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/iypkg/mtrl/purc/purcbillwork/get/txblSeqnCheck.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					txbl_seqn		: values.txbl_seqn
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
					if(result.records.length>0){
						yorn = result.records[0].success;
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});

		if(yorn == '1'){
			Ext.Msg.alert("알림","중복된 일련번호입니다.");
			return;
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			lister.getStore().sync({
				success : function(operation){
					store.clearData();
					store.removeAll();
				},
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
					store.reload();
					popup.close();
				}
			});
		}
	},

	//저장
	updateAction3: function(){
		var me = this,
			lister = me.pocket.lister5(),
			search = me.pocket.lister5search(),
			store  = lister.getStore(),
			popup  = me.pocket.popup4(),
			values = popup.down('form').getValues(),
			changes= lister.getStore().getUpdatedRecords().length,
			record = lister.getStore().getUpdatedRecords(),
			new_invc_numb, new_line_seqn, yorn,
			purc_invc_numb	//매입대장 invoice 번호
		;

		Ext.Ajax.request({
			url			: _global.location.http() + '/listener/seq/maxid.do',
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id	: _global.stor_id,
					table_nm: 'txbl_mast'
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				new_invc_numb = result.records[0].seq;
			}
		});

		//매입대장에 같이 insert하기 위한 numb - 시퀀스는 txbl과 동일하게 쓰면됨.
		Ext.Ajax.request({
			url			: _global.location.http() + '/listener/seq/maxid.do',
			params		: {
				token	: _global.token_id ,
				param	: JSON.stringify({
					stor_id	: _global.stor_id,
					table_nm: 'purc_mast'
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				purc_invc_numb = result.records[0].seq;
			}
		});

		var x = 1;	//순번
		for (var a = 0; a < changes; a++) {
			lister.getStore().getUpdatedRecords()[a].data.new_line_seqn = x++;
			lister.getStore().getUpdatedRecords()[a].data.new_invc_numb = new_invc_numb;
			lister.getStore().getUpdatedRecords()[a].data.purc_invc_numb = purc_invc_numb;
			lister.getStore().getUpdatedRecords()[a].data.publ_date = values.publ_date;
			lister.getStore().getUpdatedRecords()[a].data.txbl_volm = values.txbl_volm;
			lister.getStore().getUpdatedRecords()[a].data.txbl_honm = values.txbl_honm;
			lister.getStore().getUpdatedRecords()[a].data.txbl_seqn = values.txbl_seqn;
			lister.getStore().getUpdatedRecords()[a].data.stot_dvcd = values.stot_dvcd;
			lister.getStore().getUpdatedRecords()[a].data.rqod_rcvd_dvcd = values.rqod_rcvd_dvcd;
			lister.getStore().getUpdatedRecords()[a].data.txbl_cstm_idcd = values.txbl_cstm_idcd;
			lister.getStore().getUpdatedRecords()[a].data.txbl_cstm_name = values.txbl_cstm_name;
			lister.getStore().getUpdatedRecords()[a].data.txbl_path_dvcd = values.txbl_path_dvcd;
			lister.getStore().getUpdatedRecords()[a].data.sum_sply_amnt = values.sum_sply_amnt;
			lister.getStore().getUpdatedRecords()[a].data.sum_vatx_amnt = values.sum_vatx_amnt;
			lister.getStore().getUpdatedRecords()[a].data.sum_ttsm_amnt = values.sum_ttsm_amnt;
			lister.getStore().getUpdatedRecords()[a].data.remk_text = values.remk_text;
			lister.getStore().getUpdatedRecords()[a].data.offr_path_dvcd = '5';
		}

		for (var i = 0; i < changes; i++) {
			if(record[i].data.txbl_seqn == ''){
				Ext.Msg.alert("알림","일련번호를 입력하여주십시오.");
				return;
			}else if(record[i].data.txbl_cstm_idcd == ''){
				Ext.Msg.alert("알림","매입처를 선택하여주십시오.");
				return;
			}else if(record[i].data.txbl_volm == ''){
				Ext.Msg.alert("알림","권/호를 입력하여 주십시오.");
				return;
			}else if(record[i].data.txbl_honm == ''){
				Ext.Msg.alert("알림","권/호를 입력하여 주십시오.");
				return;
			}
		}

		//일련번호 중복체크
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/iypkg/mtrl/purc/purcbillwork/get/txblSeqnCheck.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					txbl_seqn		: values.txbl_seqn
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
					if(result.records.length>0){
						yorn = result.records[0].success;
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});

		if(yorn == '1'){
			Ext.Msg.alert("알림","중복된 일련번호입니다.");
			return;
		}else{
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			lister.getStore().sync({
				success : function(operation){
					search.getForm().reset(true);
					store.clearData();
					store.removeAll();
				},
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
					store.reload();
					popup.close();
				}
			});
		}
	},

	payAction : function(){
		var me = this,
			master = me.pocket.master(),
			records = me.pocket.master().getSelectionModel().getSelection(),
			store  = me.pocket.master().getStore(),
			val = []
		;
		if(records.length > 0){
			resource.loadPopup({
				widget : 'module-purcbillwork-pay-popup',
			});
		}else{
			Ext.Msg.alert("알림","지급할 계산서를 선택하여주십시오.");
			return;
		}

	},


	//엑셀
	exportAction : function(self) {
		this.pocket.detail().writer({enableLoadMask:true});
	},

	//엑셀2
	exportAction2 : function(self) {
		this.pocket.lister4().writer({enableLoadMask:true});
	},

});
