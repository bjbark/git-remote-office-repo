Ext.define('module.custom.hjsys.prod.workbook.WorkBook', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.OrdrHjsysPopup',
		'lookup.popup.view.ItemPopupHjsys',
		'lookup.popup.view.WkctCvicPopup'
	],

	models:[ 'module.custom.hjsys.prod.workbook.model.WorkBook',
			 'module.custom.hjsys.prod.workbook.model.WorkBookDetail',
			 ],
	stores:['module.custom.hjsys.prod.workbook.store.WorkBook',
			'module.custom.hjsys.prod.workbook.store.WorkBookDetail',
			],
	views:
	[
		'module.custom.hjsys.prod.workbook.view.WorkBookLayout',
		'module.custom.hjsys.prod.workbook.view.WorkBookSearch',
		'module.custom.hjsys.prod.workbook.view.WorkBookLister',
		'module.custom.hjsys.prod.workbook.view.WorkBookListerDetail',
		'module.custom.hjsys.prod.workbook.view.WorkBookModifyPopup',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-hjsys-workbook-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-hjsys-workbook-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-hjsys-workbook-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-hjsys-workbook-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			// lister event
			'module-hjsys-workbook-lister' : {
				selectionchange : me.selectDetail
			},
			// detail lister
			'module-hjsys-workbook-lister-detail2 button[action=exportAction]' : { click : me.exportDetailAction },	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : 	{
		layout : function () { return Ext.ComponentQuery.query('module-hjsys-workbook-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-hjsys-workbook-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-hjsys-workbook-lister')[0] },
		detail : function () { return Ext.ComponentQuery.query('module-hjsys-workbook-lister-detail')[0] },
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			detail = me.pocket.detail(),
			tpanel = me.pocket.layout().down('#mainpanel')
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister	= me.pocket.lister();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);
				}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	selectDetail : function(grid, record) {
		var me = this,
			detail = me.pocket.detail()
		;

		if (record.length > 0) {
			detail.select({
				 callback : function(records, operation, success) {
					if (success) {
					} else {}
				}, scope : me
			},{ invc_numb : record[0].data.invc_numb });
		}
	},
	modifyAction:function() {
		var me			= this,
			lister		= me.pocket.lister(),
			store		= lister.getStore(),
			select		= lister.getSelectionModel().getSelection()[0]
		;
		if(select){
			var	stdt = select.get('work_strt_dttm').split(' '),
				endt = select.get('work_endd_dttm').split(' ')
			;
			resource.loadPopup({
				widget : 'module-hjsys-workbook-modifypopup',
				params : {
					work_eddt : endt[0],
					work_edtm : endt[1],
					work_stdt : stdt[0],
					work_sttm : stdt[1],
					invc_numb : select.get('invc_numb'),
					prod_qntt : select.get('prod_qntt'),
					good_qntt : select.get('good_qntt'),
					prog_stat_dvcd : select.get('prog_stat_dvcd')
				}
			});
		}else{
			Ext.Msg.alert('알림','생산일보를 선택해주세요.');
		}
	},
	//엑셀
	exportAction : function(self) {
		this.pocket.lister().writer({enableLoadMask:true});
	},

	exportDetailAction : function(self) {
		this.pocket.detail().writer({enableLoadMask:true});
	},

});
