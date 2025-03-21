Ext.define('module.design.project.dsigfile.DsigFile', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.PjodPopup',
		'lookup.popup.view.PrjtPopup',
		'lookup.upload.FileUpload',
//		'lookup.upload.BoardUpload'
	],

	models	: [
		'module.design.project.dsigfile.model.DsigFileMaster',
		'module.design.project.dsigfile.model.DsigFileDetail3',
		'module.design.project.dsigfile.model.DsigFileTree',
		'module.design.project.dsigfile.model.DsigFileFile'
	],
	stores	: [
		'module.design.project.dsigfile.store.DsigFileMaster',
		'module.design.project.dsigfile.store.DsigFileDetail3',
		'module.design.project.dsigfile.store.DsigFileTree',
		'module.design.project.dsigfile.store.DsigFileFile'
	],
	views	: [
		'module.design.project.dsigfile.view.DsigFileLayout',
		'module.design.project.dsigfile.view.DsigFileSearch',
		'module.design.project.dsigfile.view.DsigFileListerMaster',
		'module.design.project.dsigfile.view.DsigFileTree',
		'module.design.project.dsigfile.view.DsigFileListerDetail3',
		'module.design.project.dsigfile.view.DsigFileFinder',
		'module.design.project.dsigfile.view.DsigFileFilePopup',
		'module.design.project.dsigfile.view.DsigFileBoardUpload',
	],
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-dsigfile-layout button[action=selectAction]': { click : me.selectAction },	// 조회
			// lister detail event
			'module-dsigfile-tree button[action=exportAction]'	: { click : me.exportAction },	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : {
		layout		: function () { return Ext.ComponentQuery.query('module-dsigfile-layout')[0] },
		search		: function () { return Ext.ComponentQuery.query('module-dsigfile-search')[0] },
		listermaster: function () { return Ext.ComponentQuery.query('module-dsigfile-lister-master')[0] },
		listertree	: function () { return Ext.ComponentQuery.query('module-dsigfile-tree')[0] },
		listerdetail3: function () { return Ext.ComponentQuery.query('module-dsigfile-lister-detail3')[0] },
		editor		: function () { return Ext.ComponentQuery.query('module-dsigfile-editor')[0] },
		finder		: function () { return Ext.ComponentQuery.query('module-dsigfile-finder')[0] },
		filepopup	: function () { return Ext.ComponentQuery.query('module-dsigfile-file-popup')[0] },
		upload		: function () { return Ext.ComponentQuery.query('widget.module-dsigfile-upload-popup')[0] }
	},

	//조회
	selectAction:function() {
		var me = this,
			listertree	= me.pocket.listertree(),
			finder		= me.pocket.finder(),
			search		= Ext.ComponentQuery.query('module-dsigfile-search')[0],
			pjod_idcd	= search.down('[name=pjod_idcd]').getValue(),
			tpanel		= me.pocket.layout().down('#mainpanel')
		;
		if(pjod_idcd!=''){
			listertree.getStore().clearData();
			var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			listertree.getStore().load({
				params:{param:JSON.stringify({pjod_idcd:pjod_idcd}) }
				, scope:me,
				callback:function(records, operation, success) {
					if (success) {
						listertree.getRootNode().expand();
						listertree.getSelectionModel().select(0);
					} else {
					}
					mask.hide();
				}
			});
		}else{
			Ext.Msg.alert('알림',Language.get('pjod_idcd', '금형번호')+'를 선택해주세요.');
		}
	},

	// 엑셀
	exportAction : function() {
		this.pocket.listertree().writer({enableLoadMask:true});
	}
});