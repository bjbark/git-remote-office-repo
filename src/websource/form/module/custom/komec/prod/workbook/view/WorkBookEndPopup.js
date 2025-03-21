Ext.define('module.custom.komec.prod.workbook.view.WorkBookEndPopup', { extend: 'Axt.popup.Search',
	id 		: 'module-komec-workbook-end-popup',
	alias	: 'widget.module-komec-workbook-end-popup',
	store	: 'module.custom.komec.prod.workbook.store.WorkBookCommonPopup',

	title	: Language.get('end_popup','종료'),
	closable: true,
	autoShow: true,
	width	: 450,
	height	: 150,
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
				items	: [
					{	xtype	: 'label',
						text	: '작업을 종료 하시겠습니까?',
						cls		: 'textTemp',
						style	: 'font-size:3em;',
						hidden	: me.popup.param.dvcd=="1"?true:false,
					},{fieldLabel	: Language.get('endd_qntt', '완료수량'),
						labelCls	: 'textTemp '+_global.options.work_book_tema+'label',							// label에 클래스추가
						fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',							// field에 클래스추가
						xtype		: 'popupfield',
						hidden	: me.popup.param.dvcd=="0"?true:false,
						editable	: false,
						enableKeyEvents : true,
						name		: 'endd_qntt',
						width		: 430,
						height		: 50,
						maxWidth	: 500,
						labelWidth	: 210,
						listConfig	:{
							itemCls	: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
						},
						handleMouseEvents:true,
						listeners:{
							render:function(field ){
								field.getEl().on('click', function( event, el ) {
									var trigger1 = Ext.dom.Query.select('.triggerendqntt')[0];
									Ext.get(trigger1).dom.click();
								});
							}
						},
						popup: {
							select	: 'SINGLE',
							widget	: 'lookup-keypad-popup',
							params	: { stor_grp : _global.stor_grp},
							result	: function(records, nameField, pairField){
								nameField.setValue(records[0].result);
							}
						},
						trigger1Cls : 'hideCls triggerendqntt',
					}
				]
			}
		;
		return item;
	},



	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me			= this,
			store = Ext.getStore('module.custom.komec.prod.workbook.store.WorkBookCommonPopup'),
			mainpopup = Ext.ComponentQuery.query('lookup-komec-workbook-main-popup')[0],
			lister = mainpopup.down('[itemId=mainLister]'),
			select = lister.getSelectionModel().getSelection()[0],
			tempField = mainpopup.down('[name=temp]'),
			rpmField = mainpopup.down('[name=rpm]')
		;

		var invc_date  = Ext.Date.format(new Date(),'Ymd');
		var last = 0;

		if(select.get('work_numb') != ""){
			if(select.get('last_wkct_yorn')=="1"){
				var values = me.down('form').getValues();
					me.setResponse(values);
			}else{
				tempField.setFieldStyle('backgroundColor: White;');
				rpmField.setFieldStyle('backgroundColor: White;');

				record = Ext.create( store.model.modelName , {
					invc_numb		: select.get('invc_numb'),
					pdsd_numb		: select.get('invc_numb'),
					line_seqn		: select.get('line_seqn'),
					work_numb		: select.get('work_numb'),
					item_idcd		: select.get('item_idcd'),
					invc_date		: invc_date,
					wkct_idcd		: select.get('wkct_idcd'),
					lott_numb		: select.get('lott_numb'),
					indn_qntt		: select.get('indn_qntt'),
					prod_qntt		: select.get('indn_qntt'),
					last			: last,
				});
				store.add(record);
				store.sync({
					callback: function(batch, options) {
						mainpopup.selectAction();
						this.close();
					} ,
					scope: this
				},{	_set : 'end'} );
			}
		}
	}
});
