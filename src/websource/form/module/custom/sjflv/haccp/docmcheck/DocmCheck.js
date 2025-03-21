Ext.define( 'module.custom.sjflv.haccp.docmcheck.DocmCheck', { extend:'Axt.app.Controller',
	requires:[
		'lookup.popup.view.ItemPopup',
		'lookup.popup.view.ItemPopupV4',
		'lookup.popup.view.CstmPopup',
		'lookup.popup.view.UserPopup',
		'lookup.popup.view.ItemPopupSjung',
		'lookup.upload.FileUpload',
		'module.custom.sjflv.haccp.docmmast.view.DocmMastPopup1'
	],
	models: [
		'module.custom.sjflv.haccp.docmcheck.model.DocmCheckModel1',
		'module.custom.sjflv.haccp.docmcheck.model.DocmCheckModel2'
	],
	stores: [
		'module.custom.sjflv.haccp.docmcheck.store.DocmCheckStore1',
		'module.custom.sjflv.haccp.docmcheck.store.DocmCheckStore2'
	],
	views : [
		'module.custom.sjflv.haccp.docmcheck.view.DocmCheckLayout',
		'module.custom.sjflv.haccp.docmcheck.view.DocmCheckSearch',
		'module.custom.sjflv.haccp.docmcheck.view.DocmCheckEditor',
		'module.custom.sjflv.haccp.docmcheck.view.DocmCheckPanel',
		'module.custom.sjflv.haccp.docmcheck.view.DocmCheckLister1',
		'module.custom.sjflv.haccp.docmcheck.view.DocmCheckLister2'
	],
	
	initPermission : function(workspace, permission) {
		this.callParent([workspace, permission]);
	},
	
	init: function() {
		var me = this;
		me.control({
			'module-sjflv-docmcheck-search button[action=selectAction]'		: { click : me.selectAction },		/* 조회 */
			/* 점검일지 목록 */
			'module-sjflv-docmcheck-lister1 button[action=insertAction]'	: { click : me.insertAction },		/* 추가 */
			'module-sjflv-docmcheck-lister2 button[action=modifyAction]'	: { click : me.modifyAction },		/* 수정 */
			'module-sjflv-docmcheck-lister1'								: { itemclick : me.selectAction2 },	/* 상세조회 */
			/* 점검일지 등록 */
			'module-sjflv-docmcheck-panel button[action=updateAction]'		: { click : me.updateAction },		/* 저장 */
			'module-sjflv-docmcheck-panel button[action=cancelAction]'		: { click : me.cancelAction },		/* 취소 */
		});
		me.callParent(arguments);
	},
	
	pocket : {
		layout	: function () { return Ext.ComponentQuery.query('module-sjflv-docmcheck-layout'		)[0] } ,
		search	: function () { return Ext.ComponentQuery.query('module-sjflv-docmcheck-search'		)[0] } ,
		editor	: function () { return Ext.ComponentQuery.query('module-sjflv-docmcheck-editor'		)[0] } ,
		panel	: function () { return Ext.ComponentQuery.query('module-sjflv-docmcheck-panel'		)[0] } ,
		lister1	: function () { return Ext.ComponentQuery.query('module-sjflv-docmcheck-lister1'	)[0] } ,
		lister2	: function () { return Ext.ComponentQuery.query('module-sjflv-docmcheck-lister2'	)[0] } ,
	},
	
	selectAction: function() {
		var me = this,
			params = me.pocket.search().getValues(),
			lister = me.pocket.lister1();
		
		lister.select({
			callback: function(records, operation, success) {
				if (success) {
					
				} else {
					
				}
			},
			scope: me
		}, Ext.merge( params, {stor_id : _global.stor_id}) );
	},
	
	selectAction2: function( self, record, item, index, e, eOpts ) {
		var me = this,
			lister = me.pocket.lister2();
		
		lister.select({
			callback: function(records, operation, success) {
				if (success) {
					
				} else {
					
				}
			},
			scope: me
		}, record.getData());
	},
	
	insertAction: function() {
		var me = this,
			selection = me.pocket.lister1().getSelectionModel().getSelection()[0],
			lister = me.pocket.lister2()
			store = lister.getStore(),
			editor = me.pocket.editor();
		
		if (!selection) {
			Ext.Msg.alert( '알림', '문서를 선택한 후 등록해 주세요.' );
			return false;
		}
			
		var record = Ext.create(me.models[1], {
			mngt_numb: selection.get('mngt_numb'),
			invc_date: Ext.Date.format(new Date(), 'Ymd'),
			line_seqn: 1
		});
		var param = {
			hq_id: _global.hq_id.toUpperCase(),
			api_host: _global.api_host_info,
			mngt_numb: selection.get('mngt_numb')
		};
		var url = _global.location.http() + '/custom/sjflv/haccp/docmmast/get/html/template.do?param='+JSON.stringify(param);
		
		editor.loadRecord(selection);
		store.add(record);
		lister.getSelectionModel().select(record);
		me.showHtml(url);
		me.tabChange(1);
	},
	
	modifyAction: function() {
		var me = this,
			selection1 = me.pocket.lister1().getSelectionModel().getSelection()[0],
			selection2 = me.pocket.lister2().getSelectionModel().getSelection()[0],
			editor = me.pocket.editor();
			
		var param = {
			hq_id: _global.hq_id.toUpperCase(),
			api_host: _global.api_host_info,
			mngt_numb: selection2.get('mngt_numb'),
			invc_date: Ext.util.Format.dateToStr(selection2.get('invc_date')),
			line_seqn: selection2.get('line_seqn')
		};
		var url = _global.location.http() + '/custom/sjflv/haccp/docmcheck/get/html/template/data.do?param='+JSON.stringify(param);
		
		editor.loadRecord(selection1);
		me.showHtml(url);
		me.tabChange(1);
	},
	
	updateAction: function() {
		var me = this,
			lister = me.pocket.lister2(),
			record = lister.getSelectionModel().getSelection()[0],
			store = lister.getStore();
		
		record.set('json_data', me.getDocmData());
		console.log('getDocmData', me.getDocmData());
		console.log('record', record);
		store.sync({
			success : function(records, operation){
				me.tabChange(0);
				Ext.Msg.alert('알림', '작성 완료.');
			},
			finished : function(results, record, operation){
				
			}
		});
	},
	
	cancelAction: function() {
		var me = this,
			store = me.pocket.lister2().getStore();
		
		store.rejectChanges();
		me.tabChange(0);
	},
	
	showHtml: function(url){
		var me = this,
			panel = me.pocket.panel(),
			existingItem = panel.down('#docm_check_html_viewer'),
			item = {
				xtype:'component',
				autoEl:{
					tag:'iframe',
					style : 'height:100%; width:100%; border:none;',
					src:_global.api_host_info+encodeURI(url)
				},
				id: 'docm_check_html_viewer'
			};
			
		// 기존 iframe 제거 후 새로운 iframe 추가
		if (existingItem) {
			panel.remove(existingItem);
		}
		panel.add(item);
	},
	
	getDocmData: function() {
		var document = Ext.getCmp('docm_check_html_viewer').el.dom.contentWindow.document;
		var inputs = document.querySelectorAll("input");
		var data = {};
		
		inputs.forEach(input => {
			if (input.type === "checkbox") {
				// 체크박스의 경우 체크 여부를 저장
				data[input.name] = input.checked;
			} else {
				data[input.name] = input.value; // ID와 값을 객체에 저장
			}
		});
		
		return JSON.stringify(data);
	},
	
	tabChange: function(tabIdx) {
		var me = this,
			tabpanel = me.pocket.layout().down('tab-panel');
			
		tabpanel.allowTabChange = true;  // 프로그램적으로 변경 허용
		tabpanel.setActiveTab(tabIdx);
	}
});
