Ext.define('module.custom.wontc.prod.order.workentry.WorkEntry', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.InspTypePopup',
		'lookup.popup.view.InspTypeItemPopup',
		'lookup.popup.view.KeypadPopup',
		'module.custom.wontc.prod.order.workentry.view.WorkEntryPoorPopup',
		'module.custom.wontc.prod.order.workentry.view.WorkEntryMtrlPopup'
	],

	models : [
		'module.custom.wontc.prod.order.workentry.model.WorkEntryLister',
		'module.custom.wontc.prod.order.workentry.model.WorkEntryLister2',
		'module.custom.wontc.prod.order.workentry.model.WorkEntryDetail',
		'module.custom.wontc.prod.order.workentry.model.WorkEntryPoorLister',
		'module.custom.wontc.prod.order.workentry.model.WorkEntryPoorLister2',
	],

	stores : [
		'module.custom.wontc.prod.order.workentry.store.WorkEntryLister',
		'module.custom.wontc.prod.order.workentry.store.WorkEntryLister2',
		'module.custom.wontc.prod.order.workentry.store.WorkEntryDetail',
		'module.custom.wontc.prod.order.workentry.store.WorkEntryPoorLister',
		'module.custom.wontc.prod.order.workentry.store.WorkEntryPoorLister2',
	],
	views  : [
		'module.custom.wontc.prod.order.workentry.view.WorkEntryLayout',
		'module.custom.wontc.prod.order.workentry.view.WorkEntrySearch',
		'module.custom.wontc.prod.order.workentry.view.WorkEntryEditor',
		'module.custom.wontc.prod.order.workentry.view.WorkEntryEditor2',
		'module.custom.wontc.prod.order.workentry.view.WorkEntryEditor3',
		'module.custom.wontc.prod.order.workentry.view.WorkEntryLister',
		'module.custom.wontc.prod.order.workentry.view.WorkEntryLister2',
		'module.custom.wontc.prod.order.workentry.view.WorkEntryDetail',
		'module.custom.wontc.prod.order.workentry.view.WorkEntryDetailSearch',
		'module.custom.wontc.prod.order.workentry.view.WorkEntryPoorLister',
		'module.custom.wontc.prod.order.workentry.view.WorkEntryPoorLister2',
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-wontc-workentry-layout #mainpanel'									: { tabchange : me.changeAction},
			'module-wontc-workentry-layout button[action=selectAction]'					: { click : me.selectAction },			// 조회
			'module-wontc-workentry-detailsearch button[action=selectAction2]'			: { click : me.selectAction2},			// 조회2
			'module-wontc-workentry-poor button[action=deleteAction]'						: { click : me.deletepoorAction	},		// 불량삭제
		});
		me.callParent(arguments);
	},

	pocket :
		{
			search  : function () { return Ext.ComponentQuery.query('module-wontc-workentry-search')[0] },
			layout  : function () { return Ext.ComponentQuery.query('module-wontc-workentry-layout')[0] },
			editor  : function () { return Ext.ComponentQuery.query('module-wontc-workentry-editor')[0] },
			editor2 : function () { return Ext.ComponentQuery.query('module-wontc-workentry-editor2')[0] },
			editor3 : function () { return Ext.ComponentQuery.query('module-wontc-workentry-editor3')[0] },
			poor    : function () { return Ext.ComponentQuery.query('module-wontc-workentry-poor')[0] },
			poor2   : function () { return Ext.ComponentQuery.query('module-wontc-workentry-poor2')[0] },
			lister  : function () { return Ext.ComponentQuery.query('module-wontc-workentry-lister')[0] },
			lister2 : function () { return Ext.ComponentQuery.query('module-wontc-workentry-lister2')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-wontc-workentry-detail')[0] },
			detailsearch : function () { return Ext.ComponentQuery.query('module-wontc-workentry-detailsearch')[0] },
		},


	selectAction:function(){
		var me = this,
			lister  = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			poor2   = me.pocket.poor2(),
			search  = me.pocket.search(),
			param   = search.getValues(),
			tpanel  = me.pocket.layout().down('#mainpanel'),
			tindex  = tpanel.items.indexOf(tpanel.getActiveTab()),
			editor  = me.pocket.editor()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		if(param.invc_numb == '' || param.invc_numb ==null){
			mask.hide();
			return;
		}else{
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/wontc/prod/order/workentry/get/search3.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: param.invc_numb
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
					} else {
						if(result.records.length == '0'){
							mask.hide();
							editor.form.reset();
							return;
						}else{
							var rec = result.records[0];
							var d	= Ext.Date.parse(rec.regi_date,'Ymd'),
								d2	= Ext.Date.parse(rec.deli_date,'Ymd'),
								invc_date = Ext.Date.format(d,'Y-m-d'),
								deli_date = Ext.Date.format(d2,'Y-m-d')
							;
							editor.down('[name=pror_numb]').setValue(param.invc_numb);
							editor.down('[name=invc_numb]').setValue(rec.pjod_idcd);
							editor.down('[name=item_idcd]').setValue(rec.item_idcd);
							editor.down('[name=cstm_name]').setValue(rec.cstm_name);
							editor.down('[name=invc_date]').setValue(invc_date);
							editor.down('[name=deli_date]').setValue(deli_date);
							editor.down('[name=modl_name]').setValue(rec.modl_name);
							editor.down('[name=item_name]').setValue(rec.item_name);
							editor.down('[name=item_name]').setValue(rec.item_name);
							search.down('[name=search_val]').setValue(param.invc_numb);
						}
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					mask.hide();
				}
			});
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );

			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );

			poor2.select({
				callback:function(records, operation, success) {
					if (success) {
						lister.getSelectionModel().select(0);
					} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	changeAction:function(){
		var me = this,
		lister  = me.pocket.lister(),
		lister2 = me.pocket.lister2(),
		poor2   = me.pocket.poor2(),
		search  = me.pocket.search(),
		param   = search.getValues(),
		tpanel  = me.pocket.layout().down('#mainpanel'),
		tindex  = tpanel.items.indexOf(tpanel.getActiveTab()),
		editor  = me.pocket.editor(),
		search_val = param.search_val
		;
		if(tindex == 0){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();

			if(search_val == '' || search_val ==null){
				mask.hide();
				return;
			}else{

				Ext.Ajax.request({
					url		: _global.location.http() + '/custom/wontc/prod/order/workentry/get/search3.do',
					params	: {
						token : _global.token_id,
						param : JSON.stringify({
							stor_id			: _global.stor_id,
							hqof_idcd		: _global.hqof_idcd,
							invc_numb		: search_val
						})
					},
					async	: false,
					method	: 'POST',
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						if	(!result.success ){
						} else {
							if(result.records.length == '0'){
								mask.hide();
								editor.form.reset();
								return;
							}else{
								var rec = result.records[0];
								var d	= Ext.Date.parse(rec.invc_date,'Ymd'),
									d2	= Ext.Date.parse(rec.deli_date,'Ymd'),
									invc_date = Ext.Date.format(d,'Y-m-d'),
									deli_date = Ext.Date.format(d2,'Y-m-d')
								;
								editor.down('[name=pror_numb]').setValue(search_val);
								editor.down('[name=invc_numb]').setValue(rec.invc_numb);
								editor.down('[name=line_seqn]').setValue(rec.line_seqn);
								editor.down('[name=item_idcd]').setValue(rec.item_idcd);
								editor.down('[name=cstm_name]').setValue(rec.cstm_name);
								editor.down('[name=invc_date]').setValue(invc_date);
								editor.down('[name=deli_date]').setValue(deli_date);
								editor.down('[name=invc_qntt]').setValue(rec.invc_qntt);
								editor.down('[name=modl_name]').setValue(rec.modl_name);
								editor.down('[name=mtrl_name]').setValue(rec.mtrl_name);
								editor.down('[name=item_name]').setValue(rec.item_name);
							}
						}
					},
					failure : function(result, request) {
					},
					callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
						mask.hide();
					}
				});
				lister.select({
					async:false,
					callback:function(records, operation, success) {
						if (success) {
							lister.getSelectionModel().select(0);
						} else {}
						mask.hide();
					}, scope:me
				}, Ext.merge( {invc_numb: search_val, stor_id : _global.stor_id}) );

				lister2.select({
					async	: false,
					callback:function(records, operation, success) {
						if (success) {
							lister.getSelectionModel().select(0);
						} else {}
						mask.hide();
					}, scope:me
				}, Ext.merge( {invc_numb: search_val, stor_id : _global.stor_id}) );
			}
		}else if(tindex == 1){
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();

			if(search_val == '' || search_val ==null){
				mask.hide();
				return;
			}else{
				poor2.select({
					callback:function(records, operation, success) {
						if (success) {
							lister.getSelectionModel().select(0);
						} else {}
						mask.hide();
					}, scope:me
				}, Ext.merge({invc_numb: search_val, stor_id : _global.stor_id}) );
			}
		}
	},


	selectAction2:function(){
		var me = this,
			lister = me.pocket.detail(),
			search = me.pocket.detailsearch(),
			param  = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();

		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else {}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//불량 삭제
	deletepoorAction : function() {
		var me = this,
			poor    = me.pocket.poor(),
			select  = poor.getSelectionModel().getSelection()[0],
			records = poor.getSelectionModel().getSelection()
		;
		if(!select){
			Ext.Msg.alert("알림","삭제할 불량내역을 선택해주십시오.");
		}
		if (records && records.length != 0){
			Ext.each(records, function(record) {
				Ext.Msg.confirm("확인", "삭제 하시겠습니까?", function(button) {
					if (button == 'yes') {
						Ext.each(records, function(record) {
							Ext.Ajax.request({
								url			: _global.api_host_info + '/' + _global.app_site + '/custom/wontc/prod/order/workentry/set/poordelete.do',
								method		: "POST",
								params		: {
									token	: _global.token_id,
									param	: Ext.encode({
										invc_numb	: record.raw.invc_numb,
										line_seqn	: record.raw.line_seqn
									})
								},
								success : function(response, request) {
									var object = response,
										result = Ext.decode(object.responseText)
									;
									me.pocket.poor().getStore().reload();
								},
								failure : function(response, request) {
									resource.httpError(response);
								},
								callback : function() {
								}
							});
						});
					}
				});
			});
		}
	},

});
