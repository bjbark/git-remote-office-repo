Ext.define('module.prod.cvic.cviclist.CvicList', { extend:'Axt.app.Controller',

	requires : [
		'lookup.popup.view.DeptPopup',
		'lookup.popup.view.WkctPopup',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.BasePopup',
		'lookup.popup.class.ClssMastPopup'

	],

	models:[
		'module.prod.cvic.cviclist.model.CvicList',
		'module.prod.cvic.cviclist.model.CvicListFile'
	],
	stores:[
		'module.prod.cvic.cviclist.store.CvicList',
		'module.prod.cvic.cviclist.store.CvicListFile'
	],
	views:
	[
		'module.prod.cvic.cviclist.view.CvicListLayout',
		'module.prod.cvic.cviclist.view.CvicListSearch',
		'module.prod.cvic.cviclist.view.CvicListLister',
		'module.prod.cvic.cviclist.view.CvicListLister2',
		'module.prod.cvic.cviclist.view.CvicListEditor',
		'module.prod.cvic.cviclist.view.CvicListFileLister'
	],
	initPermission: function(workspace, permission) {
		this.callParent([workspace, permission]);
	},

	init: function() {
		var me = this;
		me.control({
			// layout event
			'module-cviclist-layout button[action=selectAction]' : { click : me.selectAction },	// 조회
			// editer event
			'module-cviclist-editor button[action=cancelAction]' : { click : me.cancelAction },	// 취소
			// lister event
			'module-cviclist-lister button[action=cardAction]' : { click : me.cardAction },	// 이력카드 발행
			// lister event
			'module-cviclist-lister button[action=exportAction]' : { click : me.exportAction },	// 엑셀
			// lister event
			'module-cviclist-lister' : {
				selectionchange: me.selectRecord												// 메뉴 선택시 이벤트
			}
		});
		me.callParent(arguments);
	},
	pocket :{
		layout : function () { return Ext.ComponentQuery.query('module-cviclist-layout')[0] },
		search : function () { return Ext.ComponentQuery.query('module-cviclist-search')[0] },
		lister : function () { return Ext.ComponentQuery.query('module-cviclist-lister')[0] },
		lister2: function () { return Ext.ComponentQuery.query('module-cviclist-lister2')[0] },
		editor : function () { return Ext.ComponentQuery.query('module-cviclist-editor')[0] },
		file   : function () { return Ext.ComponentQuery.query('module-cviclist-filelist')[0] }
	},


	//조회
	selectAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			search = me.pocket.search(),
			param = search.getValues()
		;
		var mask = new Ext.LoadMask(Ext.getBody(), {msg: Const.SELECT.mask });
		mask.show();
		lister.select({
			callback:function(records, operation, success) {
			if (success) {
				lister.getSelectionModel().select(0);
			} else { me.pocket.editor().getForm().reset(true);}
				mask.hide();
			}, scope:me
		}, Ext.merge( param, {stor_id : _global.stor_id}) );
	},

	//선택
	selectRecord:function( grid, record ){
		var me			= this,
			editor		= me.pocket.editor(),
			filelister	= me.pocket.file();
		;
		editor.selectRecord({ lister : me.pocket.lister(), record : record }, me);
		if(record.length>0){
			filelister.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true);}
				}, scope:me
			}, { invc_numb : record[0].get('cvic_idcd'),orgn_dvcd : 'cvic_mast' });
		}
	},

	//취소
	cancelAction:function() {
		var me = this, editor = me.pocket.editor();
		editor.cancelRecord({
			caller : me,
			lister : me.pocket.lister(),
			callback : function( results ) {
				results.feedback( {success : true, visible : true, selectRecord : true });
			}
		}, me);
	},

	// 이력카드 발행
	cardAction : function() {
		var me = this,
			lister = me.pocket.lister(),
			select = me.pocket.lister().getSelectionModel().getSelection(),
			record = lister.getSelectionModel().getSelection(),
			jrf = 'CvicCard.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		var records = lister.getSelectionModel().getSelection();

		if(!records || records.length<1) {
			Ext.Msg.alert("알림", "설비코드목록 1건이상을 선택하여주십시오.");
			return;
		}
		var a = "";
		for(var i =0; i< record.length ; i++){

				a = record[i].get('cvic_idcd');

		}

		var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\", \"cvic_idcd\" : \"'+a+'\",\"resId\" : \"'+resId+'\"}';
		var win =  window.open(_global.location.http()+encodeURI(url),'test','width=1400,height=800')
		return win;

	},

	// 이력카드 발행
	cardAction:function() {
		var me = this,
			lister = me.pocket.lister(),
			select = lister.getSelectionModel().getSelection(),
			jrf = 'CvicCard.jrf',
			resId = _global.hq_id.toUpperCase()
		;
		var err_msg = "";
		if (!select || select.length!=1) {
			Ext.Msg.alert("알림", "목록을 선택해주십시오.");
			return;
		}
		if (select) {
			var cvic_idcd = select[0].get('cvic_idcd');
			var arg = 'cvic_idcd~'+cvic_idcd+'~';
			var url = '/ubi/getReport.do?param={\"jrf\" : \"'+jrf+'\",\"arg\" : \"'+arg+'\",\"resId\" : \"'+resId+'\"}';
			console.log(_global.location.http()+encodeURI(url));
			console.log(encodeURI(url));

			Ext.Ajax.request({
				url	:  window.open(_global.location.http()+encodeURI(url),'이력카드 발행','width=1300,height=800'),
			});
		}
	},

	//엑셀
	exportAction : function(){
		this.pocket.lister().writer({enableLoadMask:true});
	}
});
