Ext.define('module.cust.cstmvist.CstmVist', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.upload.FileUpload',
		'lookup.upload.BoardUpload',
		'lookup.popup.view.BzplPopup'
	],
	models	: [
		'module.cust.cstmvist.model.CstmVistMaster',
		'module.cust.cstmvist.model.CstmVistDetail',
		'module.cust.cstmvist.model.CstmVistFile'
	],
	stores	: [
		'module.cust.cstmvist.store.CstmVistMaster',
		'module.cust.cstmvist.store.CstmVistDetail',
		'module.cust.cstmvist.store.CstmVistList',
		'module.cust.cstmvist.store.CstmVistFile'
	],
	views	: [
		'module.cust.cstmvist.view.CstmVistLayout',
		'module.cust.cstmvist.view.CstmVistListerMaster',
		'module.cust.cstmvist.view.CstmVistListerDetail',
		'module.cust.cstmvist.view.CstmVistListerList',
		'module.cust.cstmvist.view.CstmVistLister2',
		'module.cust.cstmvist.view.CstmVistSearch',
		'module.cust.cstmvist.view.CstmVistPopup'
	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			'module-cstmvist-layout button[action=selectAction]'		: { click : me.selectAction },

			'module-cstmvist-lister-detail button[action=modifyAction]'	: { click : me.modifyAction },
			'module-cstmvist-lister-detail button[action=insertAction]'	: { click : me.insertAction },
			'module-cstmvist-lister-detail button[action=exportAction]'	: { click : me.exportAction },
			'module-cstmvist-lister-detail button[action=deleteAction]'	: { click : me.deleteAction },

			'module-cstmvist-lister-list button[action=insertAction]'	: { click : me.insertAction2 },
			'module-cstmvist-lister-list button[action=modifyAction]'	: { click : me.modifyAction2 },
			'module-cstmvist-lister-list button[action=deleteAction]'	: { click : me.deleteAction2 },
			'module-cstmvist-lister-list button[action=exportAction]'	: { click : me.exportAction2 },

			'module-cstmvist-popup button[action=updateAction]'			: { click : me.updateAction },
			'module-cstmvist-popup button[action=cancelAction]'			: { click : me.cancelAction },

			'module-cstmvist-lister-master'	: {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			},

			'module-cstmvist-lister-list' : {
				selectionchange : me.selectDetail2,
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout			: function () { return Ext.ComponentQuery.query('module-cstmvist-layout')[0] },
		search			: function () { return Ext.ComponentQuery.query('module-cstmvist-search')[0] },
		listermaster	: function () { return Ext.ComponentQuery.query('module-cstmvist-lister-master')[0]},
		listerdetail	: function () { return Ext.ComponentQuery.query('module-cstmvist-lister-detail')[0]},
		listerlist		: function () { return Ext.ComponentQuery.query('module-cstmvist-lister-list')[0]},
		lister2			: function () { return Ext.ComponentQuery.query('module-cstmvist-lister2')[0]},
		popup			: function () { return Ext.ComponentQuery.query('module-cstmvist-popup')[0]}
	},

	//조회
	selectAction:function() {
		var me = this,
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			listermaster = me.pocket.listermaster(),
			listerlist = me.pocket.listerlist(),
			search = me.pocket.search(),
			param = search.getValues()
			lister = undefined
		;
		if(param.fr_dt>param.to_dt){
			Ext.Msg.alert("알림","일자를 다시 선택해주십시오.");
		}else{
			if (tindex == 0) {
				lister = listermaster;
			} else {
				lister = listerlist;
			}

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
				if (success) {
					if ( tindex == 0 ) {
						listermaster.getSelectionModel().select(0);
					}
				} else {}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
		}
	},

	selectDetail : function(grid, record) {
		var me = this,
			listerdetail = me.pocket.listerdetail()
		;
		if (record) {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			listerdetail.select({
				callback : function(records, operation, success) {
					if (success) {
					} else {}
					mask.hide();
				}, scope : me
			},{	cstm_idcd : record.get('cstm_idcd') });
		}
	},

	//선택
	selectRecord:function( grid, records ){
		var me = this,
			listerdetail = me.pocket.listerdetail()
		;
		listerdetail.getStore().clearData();
		listerdetail.getStore().loadData([],false);
	},

	selectDetail2 : function(grid, record) {
		var me = this,
			lister2 = me.pocket.lister2()
		;

		lister2.getStore().clearData();
		lister2.getStore().loadData([],false);

		if (record!='') {
			var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.SELECT.mask });
			mask.show();
			lister2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { }
					mask.hide();
					}, scope:me
			}, { invc_numb : record[0].get('invc_numb'),orgn_dvcd : 'cstm_vist_book' });
			lister2.down('[name=file]').popup.params.invc_numb = record[0].get('invc_numb');
		}
	},

	//선택
	selectRecord2:function( grid, records ){
		var me = this,
			lister2 = me.pocket.lister2()
		;
		lister2.getStore().clearData();
		lister2.getStore().loadData([],false);
	},

	//수정
	modifyAction:function() {
		var me = this,
			listerdetail = me.pocket.listerdetail(),
			popup	= me.pocket.popup(),
			mrecords= listerdetail.getSelectionModel().getSelection(),
			select		= me.pocket.listerdetail().getSelectionModel().getSelection()[0]
		;
		if(select){
			var me = this
			resource.loadPopup({

			widget : 'module-cstmvist-popup',
			params :
				{	invc_numb		:mrecords[0].data.invc_numb,
					line_stat		:mrecords[0].data.line_stat,
					cstm_idcd		:mrecords[0].data.cstm_idcd,
					cstm_code		:mrecords[0].data.cstm_code,
					cstm_name		:mrecords[0].data.cstm_name,
					vist_date		:mrecords[0].data.vist_date,
					vist_empy_idcd	:mrecords[0].data.vist_empy_idcd,
					vist_empy_name	:mrecords[0].data.vist_empy_name,
					vist_purp_dvcd	:mrecords[0].data.vist_purp_dvcd,
					vist_recd		:mrecords[0].data.vist_recd,
					vist_stat_dvcd	:mrecords[0].data.vist_stat_dvcd,
					_set			:'update'
				}
			});
		}else{
			Ext.Msg.alert("알림","수정할 방문내역을 선택해주십시오.");
		}
	},

	//수정
	modifyAction2:function() {
		var me = this,
			listerlist = me.pocket.listerlist(),
			popup	= me.pocket.popup(),
			mrecords= listerlist.getSelectionModel().getSelection(),
			select		= me.pocket.listerlist().getSelectionModel().getSelection()[0]
		;
		if(select){
			var me = this
			resource.loadPopup({

			widget : 'module-cstmvist-popup',
			params :
				{	invc_numb		:mrecords[0].data.invc_numb,
					line_stat		:mrecords[0].data.line_stat,
					cstm_idcd		:mrecords[0].data.cstm_idcd,
					cstm_code		:mrecords[0].data.cstm_code,
					cstm_name		:mrecords[0].data.cstm_name,
					vist_date		:mrecords[0].data.vist_date,
					vist_empy_idcd	:mrecords[0].data.vist_empy_idcd,
					vist_empy_name	:mrecords[0].data.vist_empy_name,
					vist_purp_dvcd	:mrecords[0].data.vist_purp_dvcd,
					vist_recd		:mrecords[0].data.vist_recd,
					vist_stat_dvcd	:mrecords[0].data.vist_stat_dvcd,
					_set			:'update'
				}
			});
		}else{
			Ext.Msg.alert("알림","수정할 방문내역을 선택해주십시오.");
		}
	},

	//신규
	insertAction:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			popup  = me.pocket.popup(),
			mrecord		= mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0],
			invc_numb, cstm_code, cstm_name, cstm_idcd
		;
		if(mrecord){
			var me = this
			Ext.Ajax.request({
				url		: _global. location.http () + '/listener/seq/maxid.do',
				method		: "POST",
				params	: {
					token : _global. token_id ,
					param : JSON. stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'cstm_vist_book'
					})
				},
				async: false,
				success : function(response, request) {
					var object = response,
						result = Ext.decode(object.responseText)
					;
					invc_numb		= result.records[0].seq,
					cstm_code		= mrecord.get('cstm_code'),
					cstm_name		= mrecord.get('cstm_name'),
					cstm_idcd		= mrecord.get('cstm_idcd');
				},
				failure : function(response, request) {
					resource.httpError(response);
				},
				callback : function() {
				}
			});
			resource.loadPopup({
				widget : 'module-cstmvist-popup',
				params : {
					invc_numb		: invc_numb,
					cstm_code		: cstm_code,
					cstm_name		: cstm_name,
					cstm_idcd		: cstm_idcd,
					line_stat		: "0",
					_set			:'insert'
				}
			});
		}else{
			Ext.Msg.alert("알림","거래처를 선택해주십시오.");
		}
	},

	//신규
	insertAction2:function() {
		var me = this,
			listermaster = me.pocket.listermaster(),
			popup  = me.pocket.popup(),
			mrecord		= mrecord ? record[0] : listermaster.getSelectionModel().getSelection()[0],
			invc_numb, cstm_code, cstm_name, cstm_idcd
		;
		var me = this
		Ext.Ajax.request({
			url		: _global. location.http () + '/listener/seq/maxid.do',
			method		: "POST",
			params	: {
				token : _global. token_id ,
				param : JSON. stringify({
					stor_id		: _global.stor_id,
					table_nm	: 'cstm_vist_book'
				})
			},
			async: false,
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				invc_numb		= result.records[0].seq
//					cstm_code		= mrecord.get('cstm_code'),
//					cstm_name		= mrecord.get('cstm_name'),
//					cstm_idcd		= mrecord.get('cstm_idcd');
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		resource.loadPopup({
			widget : 'module-cstmvist-popup',
			params : {
				invc_numb		: invc_numb,
//					cstm_code		: cstm_code,
//					cstm_name		: cstm_name,
//					cstm_idcd		: cstm_idcd,
				line_stat		: "0",
				_set			:'insert'
			}
		});
	},

	//삭제
	deleteAction : function() {
		var me = this,
			listerdetail	= me.pocket.listerdetail(),
			store			= listerdetail.getStore(),
			records			= listerdetail.getSelectionModel().getSelection()
		;

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
			return;
		}
		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/cust/cstmvist/set/delete.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb')
						})
					},
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if (result.success) {
							store.remove(records[0]);
							store.commitChanges();
						} else {
							Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
						}
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback : function() {
						mask.hide();
					}
				});
			}
		});
	},

	//삭제
	deleteAction2 : function() {
		var me = this,
			listerlist	= me.pocket.listerlist(),
			store			= listerlist.getStore(),
			records			= listerlist.getSelectionModel().getSelection()
		;

		if (!records || records.length!=1) {
			Ext.Msg.alert("알림", "삭제 하시려는 1건을 선택 후 진행하십시오!");
			return;
		}
		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/cust/cstmvist/set/delete.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb')
						})
					},
					success : function(response, request) {
						var object = response,
							result = Ext.decode(object.responseText)
						;
						if (result.success) {
							store.remove(records[0]);
							store.commitChanges();
						} else {
							Ext.Msg.show({ msg : result.message, buttons : Ext.Msg.YES, icon : Ext.Msg.ERROR });
						}
					},
					failure : function(response, request) {
						resource.httpError(response);
					},
					callback : function() {
						mask.hide();
					}
				});
			}
		});
	},

	exportAction : function() {
		this.pocket.listerdetail().writer({enableLoadMask:true});
	},

	exportAction2 : function() {
		this.pocket.listerlist().writer({enableLoadMask:true});
	}
});
