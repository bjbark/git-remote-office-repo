Ext.define('module.custom.sjflv.item.itemspeclist.ItemSpecList', {  extend   : 'Axt.app.Controller',
	requires : [
		'lookup.popup.view.BasePopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.BzplPopup',
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.CstmClassPopup',
		'Axt.popup.view.ZipcodeSearch'
	],
	models	: [
		'module.custom.sjflv.item.itemspeclist.model.ItemSpecList',
	],
	stores	: [
		'module.custom.sjflv.item.itemspeclist.store.ItemSpecList',
	],
	views	: [
		'module.custom.sjflv.item.itemspeclist.view.ItemSpecListLayout',
		'module.custom.sjflv.item.itemspeclist.view.ItemSpecListLister',
		'module.custom.sjflv.item.itemspeclist.view.ItemSpecListSearch',
		'module.custom.sjflv.item.itemspeclist.view.ItemSpecListEditor',
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	init: function() {
		var me = this;
		me.control({
			'module-itemspeclist-layout button[action=selectAction]' : { click : me.selectAction },
			'module-itemspeclist-lister' : {
				selectionchange : me.selectRecord
			},
			'module-itemspeclist-lister button[action=ReportAction]' : { click : me.ReportAction }, // specification발행
			'module-itemspeclist-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀

		});
		me.callParent(arguments);
	},
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-itemspeclist-layout')[0] },
		search	: function () { return Ext.ComponentQuery.query('module-itemspeclist-search')[0] },
		editor	: function () { return Ext.ComponentQuery.query('module-itemspeclist-editor')[0] },
		lister	: function () { return Ext.ComponentQuery.query('module-itemspeclist-lister')[0] },
	},

	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues(),
			editor	= me.pocket.editor()
		;

		if(param.acct_code == '' || param.acct_code == null){
			Ext.Msg.alert("알림","계정구분을 선택해주세요.");
			return;
		}

		me.setValueAction(null);

		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
			mask.show();
			lister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
					mask.hide();
				}, scope:me
			}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//선택
	selectRecord:function( grid, record ){
		var me = this, editor = me.pocket.editor();
		editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
	},

	// Specification 출력
	ReportAction : function() {
		var me = this,
			lister = me.pocket.lister(),
			select = me.pocket.lister().getSelectionModel().getSelection(),
			record = lister.getSelectionModel().getSelection(),
			jrf = 'Sjflv_Specification.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();
		if(!records || records.length<1) {
			Ext.Msg.alert("알림", "품목코드 목록 1건이상을 선택하여주십시오.");
			return;
		}
		var a = "";
		for(var i =0; i< record.length ; i++){
			if(i==0){
				a += "[";
			}
				a+= '{\'item_idcd\':\''+record[i].get('item_idcd')+'\'}';
			if(i != record.length -1){
				a+=",";
			}else{
				a+="]";
			}
		}
		var _param = '_param~{\'records\':'+a+'}~';
		var arg = _param;
		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
		var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
		return win;
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	},
	
	//항목 초기화
	setValueAction : function(value) {
		var me = this,
			editor	= me.pocket.editor()
		;
		
		editor.down('[name=appr]').setValue(value);
		editor.down('[name=test_ordr]').setValue(value);
		editor.down('[name=dnst]').setValue(value);
		editor.down('[name=rfct_indx]').setValue(value);
		editor.down('[name=asen]').setValue(value);
		editor.down('[name=hmtl]').setValue(value);
		editor.down('[name=lead]').setValue(value);
		editor.down('[name=alin_mtrl]').setValue(value);
		editor.down('[name=slvt_carr]').setValue(value);
		editor.down('[name=shlf_life]').setValue(value);
		editor.down('[name=strg_cond]').setValue(value);
		editor.down('[name=melt_pont]').setValue(value);
		editor.down('[name=flsh_pont]').setValue(value);
		editor.down('[name=ingd]').setValue(value);
		editor.down('[name=ph]').setValue(value);
		editor.down('[name=ecil]').setValue(value);
		editor.down('[name=vtrl_cont]').setValue(value);
		editor.down('[name=brix]').setValue(value);
		editor.down('[name=remk_text]').setValue(value);
		editor.down('[name=guis]').setValue(value);
		editor.down('[name=etcc_memo]').setValue(value);
	}
});

