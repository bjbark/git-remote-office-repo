Ext.define('module.custom.hjsys.prod.workentry.WorkEntry', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.KeypadPopup',
		'module.custom.hjsys.prod.workentry.view.WorkEntryPoorPopup',
		'module.custom.hjsys.prod.workentry.view.WorkEntryMtrlPopup'
	],

	models : [
		'module.custom.hjsys.prod.workentry.model.WorkEntryLister',
		'module.custom.hjsys.prod.workentry.model.WorkEntryLister2',
		'module.custom.hjsys.prod.workentry.model.WorkEntryDetail',
		'module.custom.hjsys.prod.workentry.model.WorkEntryPoorLister',
		'module.custom.hjsys.prod.workentry.model.WorkEntryPoorLister2',
	],

	stores : [
		'module.custom.hjsys.prod.workentry.store.WorkEntryLister',
		'module.custom.hjsys.prod.workentry.store.WorkEntryLister2',
		'module.custom.hjsys.prod.workentry.store.WorkEntryDetail',
		'module.custom.hjsys.prod.workentry.store.WorkEntryPoorLister',
		'module.custom.hjsys.prod.workentry.store.WorkEntryPoorLister2',
	],
	views  : [
		'module.custom.hjsys.prod.workentry.view.WorkEntryLayout',
		'module.custom.hjsys.prod.workentry.view.WorkEntrySearch',
		'module.custom.hjsys.prod.workentry.view.WorkEntryEditor',
		'module.custom.hjsys.prod.workentry.view.WorkEntryEditor2',
		'module.custom.hjsys.prod.workentry.view.WorkEntryEditor3',
		'module.custom.hjsys.prod.workentry.view.WorkEntryLister',
		'module.custom.hjsys.prod.workentry.view.WorkEntryLister2',
		'module.custom.hjsys.prod.workentry.view.WorkEntryDetail',
		'module.custom.hjsys.prod.workentry.view.WorkEntryDetailSearch',
		'module.custom.hjsys.prod.workentry.view.WorkEntryPoorLister',
		'module.custom.hjsys.prod.workentry.view.WorkEntryPoorLister2',
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-workentry-layout #mainpanel'									: { tabchange : me.changeAction},
			'module-workentry-layout button[action=selectAction]'					: { click : me.selectAction },			// 조회
			'module-workentry-detailsearch button[action=selectAction2]'			: { click : me.selectAction2},			// 조회2
			'module-workentry-poor button[action=deleteAction]'						: { click : me.deletepoorAction	},		// 불량삭제
		});
		me.callParent(arguments);
	},

	pocket :
		{
			search  : function () { return Ext.ComponentQuery.query('module-workentry-search')[0] },
			layout  : function () { return Ext.ComponentQuery.query('module-workentry-layout')[0] },
			editor  : function () { return Ext.ComponentQuery.query('module-workentry-editor')[0] },
			editor2 : function () { return Ext.ComponentQuery.query('module-workentry-editor2')[0] },
			editor3 : function () { return Ext.ComponentQuery.query('module-workentry-editor3')[0] },
			poor    : function () { return Ext.ComponentQuery.query('module-workentry-poor')[0] },
			poor2   : function () { return Ext.ComponentQuery.query('module-workentry-poor2')[0] },
			lister  : function () { return Ext.ComponentQuery.query('module-workentry-lister')[0] },
			lister2 : function () { return Ext.ComponentQuery.query('module-workentry-lister2')[0] },
			detail  : function () { return Ext.ComponentQuery.query('module-workentry-detail')[0] },
			detailsearch : function () { return Ext.ComponentQuery.query('module-workentry-detailsearch')[0] },
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
				url		: _global.location.http() + '/custom/hjsys/prod/workentry/get/search3.do',
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
							var d	= Ext.Date.parse(rec.invc_date,'Ymd'),
								d2	= Ext.Date.parse(rec.deli_date,'Ymd'),
								invc_date = Ext.Date.format(d,'Y-m-d'),
								deli_date = Ext.Date.format(d2,'Y-m-d')
							;
							editor.down('[name=pror_numb]').setValue(param.invc_numb);
							editor.down('[name=invc_numb]').setValue(rec.invc_numb);
							editor.down('[name=line_seqn]').setValue(rec.line_seqn);
							editor.down('[name=amnd_degr]').setValue(rec.amnd_degr);
							editor.down('[name=item_idcd]').setValue(rec.item_idcd);
							editor.down('[name=cstm_idcd]').setValue(rec.cstm_idcd);
							editor.down('[name=cstm_name]').setValue(rec.cstm_name);
							editor.down('[name=invc_date]').setValue(invc_date);
							editor.down('[name=deli_date]').setValue(deli_date);
							editor.down('[name=invc_qntt]').setValue(rec.invc_qntt);
							editor.down('[name=item_leng]').setValue(rec.item_leng);
							editor.down('[name=item_widh]').setValue(rec.item_widh);
							editor.down('[name=modl_name]').setValue(rec.modl_name);
							editor.down('[name=item_name]').setValue(rec.item_name);
							editor.down('[name=mtrl_name]').setValue(rec.mtrl_name);
							editor.down('[name=drwg_numb]').setValue(rec.drwg_numb);
							editor.down('[name=revs_numb]').setValue(rec.revs_numb);
							editor.down('[name=item_name]').setValue(rec.item_name);
							editor.down('[name=acpt_qntt]').setValue(rec.acpt_qntt);
							editor.down('[name=need_qntt]').setValue(rec.need_qntt);
							search.down('[name=search_val]').setValue(param.invc_numb);
							editor.down('[name=unit_name]').setValue(rec.unit_name);

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
					url		: _global.location.http() + '/custom/hjsys/prod/workentry/get/search3.do',
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
								editor.down('[name=amnd_degr]').setValue(rec.amnd_degr);
								editor.down('[name=item_idcd]').setValue(rec.item_idcd);
								editor.down('[name=cstm_idcd]').setValue(rec.cstm_idcd);
								editor.down('[name=cstm_name]').setValue(rec.cstm_name);
								editor.down('[name=invc_date]').setValue(invc_date);
								editor.down('[name=deli_date]').setValue(deli_date);
								editor.down('[name=invc_qntt]').setValue(rec.invc_qntt);
								editor.down('[name=item_leng]').setValue(rec.item_leng);
								editor.down('[name=item_widh]').setValue(rec.item_widh);
								editor.down('[name=modl_name]').setValue(rec.modl_name);
								editor.down('[name=mtrl_name]').setValue(rec.mtrl_name);
								editor.down('[name=drwg_numb]').setValue(rec.drwg_numb);
								editor.down('[name=revs_numb]').setValue(rec.revs_numb);
								editor.down('[name=item_name]').setValue(rec.item_name);
								editor.down('[name=acpt_qntt]').setValue(rec.acpt_qntt);
								editor.down('[name=unit_name]').setValue(rec.unit_name);
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
								url			: _global.api_host_info + '/' + _global.app_site + '/custom/hjsys/prod/workentry/set/poordelete.do',
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
