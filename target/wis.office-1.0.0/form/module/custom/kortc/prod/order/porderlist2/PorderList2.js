Ext.define('module.custom.kortc.prod.order.porderlist2.PorderList2', { extend : 'Axt.app.Controller',

	requires:[
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.WrhsPopup',
		'lookup.upload.FileUpload',
		'lookup.popup.view.WkfwPopup',
		'lookup.popup.view.CvicPopup',
		'module.custom.kortc.prod.order.porderlist2.view.PorderList2ProdPopup',
		'module.custom.kortc.prod.order.porderlist2.view.PorderList2CopyPopup'
	],

	models:[
		'module.custom.kortc.prod.order.porderlist2.model.PorderList2Master',
		'module.custom.kortc.prod.order.porderlist2.model.PorderList2Detail',
		'module.custom.kortc.prod.order.porderlist2.model.PorderList2Detail2',
		'module.custom.kortc.prod.order.porderlist2.model.PorderList2Detail3',
		'module.custom.kortc.prod.order.porderlist2.model.PorderList2Detail4',
	],
	stores:[
		'module.custom.kortc.prod.order.porderlist2.store.PorderList2Master',
		'module.custom.kortc.prod.order.porderlist2.store.PorderList2Detail',
		'module.custom.kortc.prod.order.porderlist2.store.PorderList2Detail2',
		'module.custom.kortc.prod.order.porderlist2.store.PorderList2Detail3',
		'module.custom.kortc.prod.order.porderlist2.store.PorderList2Detail4',
	],
	views : [
		'module.custom.kortc.prod.order.porderlist2.view.PorderList2Layout',
		/* 현황 */
		'module.custom.kortc.prod.order.porderlist2.view.PorderList2Search',
		'module.custom.kortc.prod.order.porderlist2.view.PorderList2ListerMaster',
		'module.custom.kortc.prod.order.porderlist2.view.PorderList2ListerDetail',
		'module.custom.kortc.prod.order.porderlist2.view.PorderList2ListerDetail2',
		'module.custom.kortc.prod.order.porderlist2.view.PorderList2ListerDetail3',
		'module.custom.kortc.prod.order.porderlist2.view.PorderList2ListerDetail4',
		/* 작업 */
		'module.custom.kortc.prod.order.porderlist2.view.PorderList2CopyPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-kortc-porderlist2-layout button[action=selectAction]'					: { click : me.selectAction		}, /* 조회		*/

			'module-kortc-porderlist2-lister-master  button[action=insertAction]'			: { click : me.insertAction		}, /* 등록		*/
			'module-kortc-porderlist2-lister-master  button[action=modifyAction]'			: { click : me.modifyAction		}, /* 수정		*/
			'module-kortc-porderlist2-lister-master  button[action=exportAction]'			: { click : me.exportAction		}, /* 엑셀		*/
			'module-kortc-porderlist2-lister-master  button[action=deleteAction]'			: { click : me.deleteAction		}, /* 삭제		*/
			'module-kortc-porderlist2-lister-detail  button[action=prorAction]'				: { click : me.prorAction		}, /* 생산지시	*/
			'module-kortc-porderlist2-lister-detail2 button[action=exportAction]'			: { click : me.exportDetailAction}, /* 엑셀		*/
			'module-kortc-porderlist2-lister-detail3 button[action=exportAction]'			: { click : me.exportDetailAction}, /* 엑셀		*/
			'module-kortc-porderlist2-lister-detail4 button[action=exportAction]'			: { click : me.exportDetailAction}, /* 엑셀		*/

			'module-kortc-porderlist2-worker-lister button[action=updateAction]'			: { click : me.updateAction		}, /* 저장		*/
			'module-kortc-porderlist2-worker-lister button[action=cancelAction]'			: { click : me.cancelAction		}, /* 취소		*/
			'module-kortc-porderlist2-lister-master' : {
				itemdblclick    : me.selectDetail,
				selectionchange : me.selectRecord
			}
		});
		me.callParent(arguments);
	},
	pocket : {
		layout : function () { return Ext.ComponentQuery.query('module-kortc-porderlist2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-kortc-porderlist2-search')[0] },
		worker : {
			editor : function () { return Ext.ComponentQuery.query('module-kortc-porderlist2-worker-editor')[0] },
			lister : function () { return Ext.ComponentQuery.query('module-kortc-porderlist2-worker-lister')[0] }
		},
		master  : function () { return Ext.ComponentQuery.query('module-kortc-porderlist2-lister-master')[0] },
		detail  : function () { return Ext.ComponentQuery.query('module-kortc-porderlist2-lister-detail')[0] },
		popup : function () { return Ext.ComponentQuery.query('module-kortc-porderlist2-copy-popup')[0] },
	},
	selectAction:function(callbackFn) {
		var me = this,
			editor = me.pocket.worker.editor(),
			lister = me.pocket.master()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask});
		mask.show();
		lister.select({
			 callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true); }
				mask.hide();
			}, scope:me
		}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
	},

	selectRecord:function( grid, records ){
		var me = this,
			detail = me.pocket.detail()
		;
		detail.getStore().clearData();
		detail.getStore().loadData([],false);
	},

	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.detail()
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
			}, { invc_numb : record.get('invc_numb') });
		}
	},
	exportAction : function(self) {
		this.pocket.master().writer({enableLoadMask:true});
	},
	exportDetailAction : function(self) {
		this.pocket.detail().writer({enableLoadMask:true});

	}
});
