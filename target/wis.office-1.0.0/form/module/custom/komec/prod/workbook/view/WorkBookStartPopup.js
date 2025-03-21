Ext.define('module.custom.komec.prod.workbook.view.WorkBookStartPopup', { extend: 'Axt.popup.Search',
	id 		: 'module-komec-workbook-start-popup',
	alias	: 'widget.module-komec-workbook-start-popup',

	title	: Language.get('start_popup','시작'),
	closable: true,
	autoShow: true,
	width	: 550,
	layout	: {
		type: 'border'
	},
	matcode : undefined,
	matname : undefined,
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this;
		me.items = [me.createForm()];
		me.callParent(arguments);
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout' ,
				region		: 'center',
				border		: false,
				items		: [ me.createForm() ]  //me.createToolbar(),
			};
		return form;
	},


	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createForm: function(){
		var me = this,
			wkct_idcd = me.popup.param.wkct_idcd?me.popup.param.wkct_idcd:"",
			item = {
				xtype			: 'form-panel',
				layout			: 'fit',
				region			: 'center',
				flex			: 1,
				bodyStyle		: { padding: '5px' },
				dockedItems	: {
					xtype	: 'toolbar',
					dock	: 'bottom',
					items	: [
						'->' ,
						{xtype: 'button' , text : '<span class="btnTemp">확인</span>', iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style', width: 150,height:50},'-',
						{xtype: 'button' , text : '<span class="btnTemp">닫기</span>', iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style', width: 150,height:50}
					]
				},
				items			: [
					{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '30',
						items	: [
							{	fieldLabel	: Language.get('wker_idcd_1fst','작업자'),
								value		: '',
								xtype		: 'popupfield',
								name		: 'wker_name_1fst',
								pair		: 'wker_idcd_1fst',
								width		: 400,
								height		: 50,
								labelWidth	: 100,
								readOnly	: true,
								allowBlank	: false,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field requiredindex',
								listeners:{
									afterrender:function(field){
										var me = this;
										field.inputEl.on({
											click: function () {
												me.onTriggerClick();
											}
										});
									}
								},
								popup: {
									select : 'SINGLE',
									widget : 'lookup-wkctmans-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd, tema : _global.options.work_book_tema},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('empy_name'));
										pairField.setValue(records[0].get('empy_idcd'));
									}
								}
							},{	name : 'wker_idcd_1fst', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('wker_name_2snd',' '),
								value		: '',
								xtype		: 'popupfield',
								name		: 'wker_name_2snd',
								pair		: 'wker_idcd_2snd',
								width		: 400,
								height		: 50,
								labelWidth	: 100,
								readOnly	: true,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								listeners:{
									afterrender:function(field){
										var me = this;
										field.inputEl.on({
											click: function () {
												me.onTriggerClick();
											}
										});
									}
								},
								popup: {
									select : 'SINGLE',
									widget : 'lookup-wkctmans-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd,tema : _global.options.work_book_tema},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('empy_name'));
										pairField.setValue(records[0].get('empy_idcd'));
									}
								}
							},{	name : 'wker_idcd_2snd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('wker_name_3trd',' '),
								value		: '',
								xtype		: 'popupfield',
								name		: 'wker_name_3trd',
								pair		: 'wker_idcd_3trd',
								width		: 400,
								height		: 50,
								labelWidth	: 100,
								readOnly	: true,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								listeners:{
									afterrender:function(field){
										var me = this;
										field.inputEl.on({
											click: function () {
												me.onTriggerClick();
											}
										});
									}
								},
								popup: {
									select : 'SINGLE',
									widget : 'lookup-wkctmans-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd,tema : _global.options.work_book_tema},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('empy_name'));
										pairField.setValue(records[0].get('empy_idcd'));
									}
								}
							},{	name : 'wker_idcd_3trd', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('wker_idcd_4frt',' '),
								value		: '',
								xtype		: 'popupfield',
								name		: 'wker_name_4frt',
								pair		: 'wker_idcd_4frt',
								width		: 400,
								height		: 50,
								labelWidth	: 100,
								readOnly	: true,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								listeners:{
									afterrender:function(field){
										var me = this;
										field.inputEl.on({
											click: function () {
												me.onTriggerClick();
											}
										});
									}
								},
								popup: {
									select : 'SINGLE',
									widget : 'lookup-wkctmans-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd,tema : _global.options.work_book_tema},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('empy_name'));
										pairField.setValue(records[0].get('empy_idcd'));
									}
								}
							},{	name : 'wker_idcd_4frt', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('wker_name_5trd',' '),
								value		: '',
								xtype		: 'popupfield',
								name		: 'wker_name_5fit',
								pair		: 'wker_idcd_5fit',
								width		: 400,
								height		: 50,
								labelWidth	: 100,
								readOnly	: true,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								listeners:{
									afterrender:function(field){
										var me = this;
										field.inputEl.on({
											click: function () {
												me.onTriggerClick();
											}
										});
									}
								},
								popup: {
									select : 'SINGLE',
									widget : 'lookup-wkctmans-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd : wkct_idcd,tema : _global.options.work_book_tema},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('empy_name'));
										pairField.setValue(records[0].get('empy_idcd'));
									}
								}
							},{	name : 'wker_idcd_5fit', xtype : 'textfield' , hidden : true
							},{	fieldLabel	: Language.get('cvic_name','설비'),
								xtype		: 'popupfield',
								name		: 'cvic_name',
								pair		: 'cvic_idcd',
								width		: 400,
								height		: 50,
								labelWidth	: 100,
								readOnly	: true,
								labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
								fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
								value		: _global.login_nm,
								listeners:{
									afterrender:function(field){
										var me = this;
										field.inputEl.on({
											click: function () {
												me.onTriggerClick();
											}
										});
									}
								},
								popup: {
									select : 'SINGLE',
									widget : 'lookup-cvic-popup',
									params : { stor_grp : _global.stor_grp , row_sts : '0',cvic_kind_dvcd : '1000',tema : _global.options.work_book_tema},
									result : function(records, nameField, pairField) {
										nameField.setValue(records[0].get('cvic_name'));
										pairField.setValue(records[0].get('cvic_idcd'));
									}
								}
							},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true,value:_global.login_pk
							}
						]
					},
				]
			}
		;
		return item;
	},



	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me	= this,
			store = Ext.getStore('module.custom.komec.prod.workbook.store.WorkBookCommonPopup'),
			editor = me.down('form'),
			param  = editor.getValues(),
			mainpopup = Ext.ComponentQuery.query('lookup-komec-workbook-main-popup')[0]
			lister = mainpopup.down('[itemId=mainLister]'),
			select = lister.getSelectionModel().getSelection()[0],
			work_numb = ""
		;
		var arr = [];
		if(param.wker_idcd_1fst != "") arr.push(param.wker_idcd_1fst);
		if(param.wker_idcd_2snd != "") arr.push(param.wker_idcd_2snd);
		if(param.wker_idcd_3trd != "") arr.push(param.wker_idcd_3trd);
		if(param.wker_idcd_4frt != "") arr.push(param.wker_idcd_4frt);
		if(param.wker_idcd_5fit != "") arr.push(param.wker_idcd_5fit);
		if(editor.getForm().isValid()){
			var invc_date  = Ext.Date.format(new Date(),'Ymd');

			Ext.Ajax.request({
				url		: _global. location.http () + '/listener/seq/maxid.do',
				method		: "POST",
				params	: {
					token : _global. token_id ,
					param : JSON. stringify({
						stor_id		: _global.stor_id,
						table_nm	: 'work_book'
					})
				},
				async: false,
				success : function(response, request) {
					var object = response,
						result = Ext.decode(object.responseText)
					;
					work_numb = result.records[0].seq;
				},
				failure : function(response, request) {
					resource.httpError(response);
				},
				callback : function() {
				}
			});
			console.log('0000000000');
			console.log(work_numb);
			if(work_numb  != ""){
				console.log('11111111');
				console.log(param.cvic_idcd);
				record = Ext.create( store.model.modelName , {
					invc_numb		: select.get('invc_numb'),
					pdsd_numb		: select.get('invc_numb'),
					line_seqn		: select.get('line_seqn'),
					work_numb		: work_numb,
					item_idcd		: select.get('item_idcd'),
					invc_date		: invc_date,
					wker_idcd		: arr,
					wkct_idcd		: select.get('wkct_idcd'),
					lott_numb		: select.get('lott_numb'),
					indn_qntt		: select.get('indn_qntt'),
					prod_qntt		: select.get('indn_qntt'),
					cvic_idcd		: param.cvic_idcd,
				});
				store.add(record);
				store.sync({
					callback: function(batch, options) {
						mainpopup.selectAction();
						editor.getForm().reset();
						this.close();
					} ,
					scope: this
				},{	synchro : _global.objects.synchro,_set : 'insert'} );
			}
		}
	}
});
