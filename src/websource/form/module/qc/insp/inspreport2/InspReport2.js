Ext.define('module.qc.insp.inspreport2.InspReport2', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.ProrPopup',
	],

	models:[
		'module.qc.insp.inspreport2.model.InspReport2Lister',
		'module.qc.insp.inspreport2.model.InspReport2Lister2',
		'module.qc.insp.inspreport2.model.InspReport2Lister3'
	],
	stores:[
		'module.qc.insp.inspreport2.store.InspReport2Lister',
		'module.qc.insp.inspreport2.store.InspReport2Lister2',
		'module.qc.insp.inspreport2.store.InspReport2Lister3'
	],
	views:
	[
		'module.qc.insp.inspreport2.view.InspReport2Layout',
		'module.qc.insp.inspreport2.view.InspReport2Search',
		'module.qc.insp.inspreport2.view.InspReport2Lister',
		'module.qc.insp.inspreport2.view.InspReport2Lister2',
		'module.qc.insp.inspreport2.view.InspReport2Lister3'

	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-inspreport2-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			'module-inspreport2-layout #mainpanel' : {
				tabchange : me.selectAction
			},
			// lister event

			'module-inspreport2-lister button[action=printAction]'	: { click : me.printAction },	// 검사성적서발행
			'module-inspreport2-lister2 button[action=printAction]'	: { click : me.printAction },	// 검사성적서발행
			'module-inspreport2-lister3 button[action=printAction]'	: { click : me.printAction },	// 검사성적서발행
			'module-inspreport2-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-inspreport2-lister2 button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			'module-inspreport2-lister3 button[action=exportAction]' : { click : me.exportAction },	// 엑셀

		});
		me.callParent(arguments);
	},
	pocket :
		{
		layout : function () { return Ext.ComponentQuery.query('module-inspreport2-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-inspreport2-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-inspreport2-lister')[0] },
		lister2 : function () { return Ext.ComponentQuery.query('module-inspreport2-lister2')[0] },
		lister3 : function () { return Ext.ComponentQuery.query('module-inspreport2-lister3')[0] }
		},


	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			lister2 = me.pocket.lister2(),
			lister3 = me.pocket.lister3(),
			search = me.pocket.search(),
			param = search.getValues(),
			invc_numb = search.down('[name=invc_numb]').getValue(),
			insp_date = search.down('[name=insp_date]').getValue(),
			tpanel = me.pocket.layout().down('#mainpanel'),
			tindex = tpanel.items.indexOf(tpanel.getActiveTab())
		;
		if(invc_numb){
			if(insp_date){
				var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
				if(tindex==0){
					mask.show();
					lister.select({
						callback:function(records, operation, success) {
						if (success) {
							lister.getSelectionModel().select(0);
						} else {
						}
						mask.hide();
						}, scope:me
					}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp }));
				}else if(tindex==1){
					mask.show();
					lister2.select({
						callback:function(records, operation, success) {
						if (success) {
							lister.getSelectionModel().select(0);
						} else {
						}
						mask.hide();
						}, scope:me
					}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp}));

				}else if(tindex==2){
					mask.show();
					lister3.select({
						callback:function(records, operation, success) {
						if (success) {
							lister.getSelectionModel().select(0);
						} else {
						}
						mask.hide();
						}, scope:me
					}, Ext.merge(me.pocket.search().getValues(), { stor_grp : _global.stor_grp}));
				}
			}else{
				Ext.Msg.alert('알림','검사일자를 입력해주세요.');
				return;
			}
		}else{
			Ext.Msg.alert('알림','작업지시번호를 입력해주세요.');
			return;
		}
	},

	// 검사성적서 발행
	printAction:function(comp) {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			select = me.pocket.lister().getSelectionModel().getSelection(),
			jrf = '',
			resId = _global.hq_id.toUpperCase(),
			param = search.getValues()
		;
		var err_msg = "";
		if (param.invc_numb =="") {
			Ext.Msg.alert("알림", "작업지시번호를 선택해주세요.");
			return;
		}
		if (param.insp_date =="") {
			Ext.Msg.alert("알림", "검사일자를 선택해주세요.");
			return;
		}
		var wkod_numb = param.invc_numb;
		var insp_date = param.insp_date;
		var arg = 'wkod_numb~'+wkod_numb+'~'+'insp_date~'+insp_date+'~'/*+'query_dvcd.작업지시번호.'*/;

		if(comp.itemId == 'lister1'){
			jrf = 'Deduk_Type1.jrf';
		}else if(comp.itemId == 'lister2'){
			jrf = 'Deduk_Type2.jrf';
		}else if(comp.itemId == 'lister3'){
			jrf = 'Deduk_Type3.jrf';
		}

		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';

		Ext.Msg.confirm("확인", "검사성적서를 발행하시겠습니까?", function(button) {
			if (button == 'yes') {
				var win	=  window.open(_global.location.http()+encodeURI(url),'test','width=1000,height=900')
				return win;
			}
		});
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
