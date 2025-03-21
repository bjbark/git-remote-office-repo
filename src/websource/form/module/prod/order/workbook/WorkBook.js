Ext.define('module.prod.order.workbook.WorkBook', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.WrhsPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CvicPopup',
		'lookup.popup.view.WkctCvicPopup'
	],

	models:['module.prod.order.workbook.model.WorkBook',
			 'module.prod.order.workbook.model.WorkBookDetail1',
			 'module.prod.order.workbook.model.WorkBookDetail2',
			 'module.prod.order.workbook.model.WorkBookDetail3',
			 'module.prod.order.workbook.model.WorkBookDetail4',
			 'module.prod.order.workbook.model.WorkBookDetail5'
			 ],
	stores:['module.prod.order.workbook.store.WorkBook',
			'module.prod.order.workbook.store.WorkBookDetail1',
			'module.prod.order.workbook.store.WorkBookDetail2',
			'module.prod.order.workbook.store.WorkBookDetail3',
			'module.prod.order.workbook.store.WorkBookDetail4',
			'module.prod.order.workbook.store.WorkBookDetail5',
			],
	views:
	[
		'module.prod.order.workbook.view.WorkBookLayout',
		'module.prod.order.workbook.view.WorkBookSearch',
		'module.prod.order.workbook.view.WorkBookLister',
		'module.prod.order.workbook.view.WorkBookListerDetail1',
		'module.prod.order.workbook.view.WorkBookListerDetail2',
		'module.prod.order.workbook.view.WorkBookListerDetail3',
		'module.prod.order.workbook.view.WorkBookListerDetail4',
		'module.prod.order.workbook.view.WorkBookListerDetail5',
		'module.prod.order.workbook.view.WorkBookModifyPopup'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-workbook-layout #detail'					 : { tabchange : me.tabChange },
			'module-workbook-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-workbook-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-workbook-lister button[action=modifyAction]' : { click : me.modifyAction },	// 수정
			'module-workbook-lister button[action=insertAction]' : { click : me.insertAction },	// 신규
			'module-workbook-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-workbook-lister button[action=deleteAction]' : { click : me.deleteAction },	// 삭제
			// lister event
			'module-workbook-lister' : {
				itemdblclick : me.tabChange,
				selectionchange : me.attachRecord
			},
			// detail lister
			'module-workbook-lister-detail1 button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-workbook-lister-detail2 button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-workbook-lister-detail3 button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-workbook-lister-detail4 button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-workbook-lister-detail5 button[action=exportAction]' : { click : me.exportAction },	// 엑셀
		});
		me.callParent(arguments);
	},
	pocket : 	{
		layout : function () { return Ext.ComponentQuery.query('module-workbook-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-workbook-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-workbook-lister')[0] },
		detail1 : function () { return Ext.ComponentQuery.query('module-workbook-lister-detail1')[0] },
		detail2 : function () { return Ext.ComponentQuery.query('module-workbook-lister-detail2')[0] },
		detail3 : function () { return Ext.ComponentQuery.query('module-workbook-lister-detail3')[0] },
		detail4 : function () { return Ext.ComponentQuery.query('module-workbook-lister-detail4')[0] },
		detail5 : function () { return Ext.ComponentQuery.query('module-workbook-lister-detail5')[0] },
	},

	//선택
	tabChange : function(){
		var me = this,
			tpanel = me.pocket.layout().down('#detail'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab()),
			lister = me.pocket.lister(),
			detail1 = me.pocket.detail1(),
			detail2 = me.pocket.detail2(),
			detail3 = me.pocket.detail3(),
			detail4 = me.pocket.detail4(),
			detail5 = me.pocket.detail5(),
			record = lister.getSelectionModel().getSelection()[0]
		;

		if(record==null){
		}else{
			if(tindex == 0){
				lister = detail1
			}else if(tindex == 1){
				lister = detail2
			}else if(tindex == 2){
				lister = detail3
			}else if(tindex == 3){
				lister = detail4
			}else if(tindex == 4){
				lister = detail5
			}
			lister.select({
				callback : function(records, operation, success) {
						if (success) {
						} else {}
					}, scope : me
			}, { invc_numb : record.get('invc_numb'), wkod_numb : record.get('wkod_numb'), wkct_idcd : record.get('wkct_idcd') });
		}
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			detail1 = me.pocket.detail1(),
			detail2 = me.pocket.detail2(),
			detail3 = me.pocket.detail3(),
			detail4 = me.pocket.detail4(),
			detail5 = me.pocket.detail5(),
			tpanel = me.pocket.layout().down('#mainpanel')
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister	= me.pocket.lister();
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
//					lister.getSelectionModel().select(0);
				} else { me.pocket.editor().getForm().reset(true);
				}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	attachRecord:function( smodel, record ){
		var me	= this,
		lister		= smodel ? smodel.view.ownerCt : me.pocket.lister(),
		record		= record ? record[0] : lister.getSelectionModel().getSelection()[0]
		;
		me.pocket.detail1().eraser() ;
		me.pocket.detail2().eraser() ;
		me.pocket.detail3().eraser() ;
		me.pocket.detail4().eraser() ;
		me.pocket.detail5().eraser() ;
		if (record) {
		}
	},
	modifyAction : function(){
		var me			= this,
			lister		= me.pocket.lister(),
			store		= lister.getStore(),
			select		= lister.getSelectionModel().getSelection()[0]
		;
		if(select){
			resource.loadPopup({
				widget : 'module-workbook-modifypopup',
				params : {
					work_eddt : new Date(select.get('work_endd_dttm')),
					work_edtm : Ext.Date.format(new Date(select.get('work_endd_dttm')),'H:i'),
					work_stdt : new Date(select.get('work_strt_dttm')),
					work_sttm : Ext.Date.format(new Date(select.get('work_strt_dttm')),'H:i'),
					invc_numb : select.get('invc_numb'),
					wkod_numb : select.get('wkod_numb'),
					wkod_seqn : select.get('wkod_seqn'),
					prog_stat_dvcd : select.get('prog_stat_dvcd')
				}
			});
		}else{
			Ext.Msg.alert('알림','생산일보를 선택해주세요.');
		}
	},
	//엑셀
	exportAction : function(field){
		var me = this,
			lister = me.pocket.lister(),
			detail1 = me.pocket.detail1(),
			detail2 = me.pocket.detail2(),
			detail3 = me.pocket.detail3(),
			detail4 = me.pocket.detail4()
		;
		if(field.itemId == 'lister'){
			lister.writer({enableLoadMask:true});
		}else if (field.itemId == 'detail1'){
			detail1.writer({enableLoadMask:true});
		}else if (field.itemId == 'detail2'){
			detail2.writer({enableLoadMask:true});
		}else if (field.itemId == 'detail3'){
			detail3.writer({enableLoadMask:true});
		}else {
			detail4.writer({enableLoadMask:true});
		}
	}

});
