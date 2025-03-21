Ext.define('module.custom.iypkg.stock.isos.mtrlostt2.MtrlOstt2', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.IypkgOrdrPopup',
		'lookup.popup.view.ProdPopup',
		'lookup.popup.view.WrhsPopup',
	],

	models:[
		'module.custom.iypkg.stock.isos.mtrlostt2.model.MtrlOstt2Master',
		'module.custom.iypkg.stock.isos.mtrlostt2.model.MtrlOstt2Worker',
	],
	stores:[
		'module.custom.iypkg.stock.isos.mtrlostt2.store.MtrlOstt2Master',
		'module.custom.iypkg.stock.isos.mtrlostt2.store.MtrlOstt2Worker',
	],
	views : [
		'module.custom.iypkg.stock.isos.mtrlostt2.view.MtrlOstt2Layout',
		'module.custom.iypkg.stock.isos.mtrlostt2.view.MtrlOstt2Search',
		'module.custom.iypkg.stock.isos.mtrlostt2.view.MtrlOstt2Master',
		'module.custom.iypkg.stock.isos.mtrlostt2.view.MtrlOstt2WorkerSearch',
		'module.custom.iypkg.stock.isos.mtrlostt2.view.MtrlOstt2WorkerLister',

	],

	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({// TODO
			'module-mtrlostt2-layout #mainpanel'									: { tabchange : me.selectAction		},
			'module-mtrlostt2-layout button[action=selectAction]'					: { click : me.selectAction			}, /* 조회 */
			'module-mtrlostt2-lister button[action=exportAction]'					: { click : me.exportAction			}, /* 엑셀 */
			'module-mtrlostt2-lister button[action=deleteAction]'					: { click : me.deleteAction			}, /* 삭제 */

			'module-mtrlostt2-lister-master button[action=updateAction]'			: { click : me.updateAction			}, /* 저장 */
			'module-mtrlostt2-lister-master button[action=cancelAction]'			: { click : me.cancelAction			}, /* 취소 */
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-mtrlostt2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-mtrlostt2-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-mtrlostt2-lister')[0] },
		workerlister : function () { return Ext.ComponentQuery.query('module-mtrlostt2-lister-master')[0] },
		workersearch : function () { return Ext.ComponentQuery.query('module-mtrlostt2-worker-search')[0] },

	},

	//조회
	selectAction:function(callbackFn) {
		var me = this
			master = me.pocket.lister(),
			workerlister = me.pocket.workerlister(),
			search = me.pocket.search(),
			param = search.getValues(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = undefined
		;
		if(tindex==1){
			lister = master;
			me.pocket.search().down('[name=collapsed]').expand();
		}else if(tindex==0){
			lister = workerlister;
			me.pocket.search().down('[name=collapsed]').collapse();
		}

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
				} else {
				}
				mask.hide();
			}, scope:me
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));

	},

	//저장
	updateAction:function() {
		var me = this,
		lister  = me.pocket.lister(),
		lister2 = me.pocket.workerlister(),
		search  = me.pocket.workersearch(),
		param   = search.getValues(),
		changes = lister2.getStore().getUpdatedRecords().length,
		new_invc_numb, new_line_seqn, invc_date, wrhs_name,wrhs_idcd,
		tpanel = me.pocket.layout().down('#mainpanel')
	;
		if(param.ostt_date == ''){
			Ext.Msg.alert("알림","출고일자를 입력해주세요.");
			return;
		}else if(param.wrhs_idcd == ''){
			Ext.Msg.alert("알림","출고창고를 선택해주세요.");
			return;
		}

		if (changes == 0) {
			Ext.Msg.alert("알림","변경된 사항이 없습니다.");
		} else {
				Ext.Ajax.request({
					url : _global.location.http() + '/listener/seq/maxid.do',
					object		: resource.keygen,
					params		: {
						token	: _global.token_id ,
						param	: JSON.stringify({
							stor_id		: _global.stor_id,
							table_nm	: 'mtrl_ostt_mast'
						})
					},
					async	: false,
					success	: function(response, request) {
						var result = Ext.decode(response.responseText);
						new_invc_numb = result.records[0].seq;
					}
				});

			var x = 1;	//순번
			for(var i=0;i<changes;i++){
				lister2.getStore().getUpdatedRecords()[i].data.new_line_seqn = x++;
				lister2.getStore().getUpdatedRecords()[i].data.new_invc_numb = new_invc_numb;
				lister2.getStore().getUpdatedRecords()[i].data.ostt_date = param.ostt_date;
				lister2.getStore().getUpdatedRecords()[i].data.wrhs_idcd = param.wrhs_idcd;
				lister2.getStore().getUpdatedRecords()[i].data.sum_qntt =
					lister2.getStore().data.items[i].data.ostt_qntt + lister2.getStore().data.items[i].data.ostt_qntt2;
			}

			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.UPDATE.mask });
			mask.show();
			var store = lister2.getStore();
			lister2.getStore().sync({
				success : function(operation){
					lister.getStore().reload();
					search.getForm().reset(true);
				},
				failure : function(operation){ },
				callback: function(operation){
					mask.hide();
					store.reload();
				}
			});
		}
	},


	//삭제
	deleteAction:function() {
		var me = this,
			master = me.pocket.lister(),
			store  = master.getStore()
		;
		var err_msg = "";
		var records = master.getSelectionModel().getSelection();
		console.log(records);

		Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
			if (button == 'yes') {

				var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
				mask.show();

				Ext.Ajax.request({
					url			: _global.api_host_info + '/' + _global.app_site + '/custom/iypkg/stock/isos/mtrlostt2/set/del_yn.do',
					method		: "POST",
					params		: {
					 	token	: _global.token_id,
						param	: Ext.encode({
							invc_numb	: records[0].get('invc_numb'),
							line_seqn	: records[0].get('line_seqn'),
							orig_invc_numb	: records[0].get('orig_invc_numb'),
							orig_seqn	: records[0].get('orig_seqn'),
							ostt_qntt	: records[0].data.ostt_qntt
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

	cancelAction:function() {
		var me = this,
		lister = me.pocket.workerlister(),
		tpanel = me.pocket.layout().down('#mainpanel'),
		tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		tpanel.items.indexOf(tpanel.setActiveTab(0));
	},

	exportAction : function(self) {
		this.pocket.lister().writer({enableLoadMask:true});
	},


});
