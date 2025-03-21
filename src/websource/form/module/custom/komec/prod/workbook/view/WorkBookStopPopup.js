Ext.define('module.custom.komec.prod.workbook.view.WorkBookStopPopup', { extend: 'Axt.popup.Search',
	id 		: 'module-komec-workbook-stop-popup',
	alias	: 'widget.module-komec-workbook-stop-popup',
	store	: 'module.custom.komec.prod.workbook.store.WorkBookCommonPopup',

	title	: Language.get('stop_popup','중단'),
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
						text	: '작업을 중단 하시겠습니까?',
						cls		: 'textTemp',
						style	: 'font-size:3em;'
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
			mainpopup = Ext.ComponentQuery.query('lookup-komec-workbook-main-popup')[0]
			lister = mainpopup.down('[itemId=mainLister]'),
			select = lister.getSelectionModel().getSelection()[0]
		;
		var invc_date  = Ext.Date.format(new Date(),'Ymd');
		if(select.get('work_numb') != ""){
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
			});
			store.add(record);
			store.sync({
				callback: function(batch, options) {
					mainpopup.selectAction();
					this.close();
				} ,
				scope: this
			},{	synchro : _global.objects.synchro,_set : 'stop'} );
		}
	}
});
