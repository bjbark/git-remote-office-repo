Ext.define('module.custom.dhtec.prod.workentry.view.WorkEntryCastPopup', { extend: 'Axt.popup.Search',
	id 		: 'module-dhtec-workenty-cast-popup',
	alias	: 'widget.module-dhtec-workenty-cast-popup',
	store	: 'module.custom.dhtec.prod.workentry.store.WorkEntryCastPopup',

	title	: Language.get('cast_popup','시작'),
	closable: true,
	autoShow: true,
	width	: 1180,
	height	: 850,
	layout	: {
		type: 'border'
	},
	matcode : undefined,
	matname : undefined,
	defaultFocus : 'initfocused',
	initComponent: function(config){
		var me = this;
		var wkctLookup = new Array();
		var cvicLookup = new Array();
		cvicLookup.push(['','']);
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/dhtec/prod/workentry/get/wkctsearch.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
					for(var i =0; i<result.records.length;i++){
						wkctLookup.push([result.records[i].wkct_idcd,result.records[i].wkct_name]);
					}
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
//		Ext.Ajax.request({
//			url		: _global.location.http() + '/custom/dhtec/prod/workentry/get/cvicsearch.do',
//			params	: {
//				token : _global.token_id,
//				param : JSON.stringify({
//					stor_id			: _global.stor_id,
//					hqof_idcd		: _global.hqof_idcd,
//				})
//			},
//			async	: false,
//			method	: 'POST',
//			success	: function(response, request) {
//				var result = Ext.decode(response.responseText);
//				if	(!result.success ){
//					return;
//				} else {
//					for(var i =0; i<result.records.length;i++){
//						cvicLookup.push([result.records[i].cvic_idcd, result.records[i].cvic_name]);
//					}
//				}
//			},
//			failure : function(result, request) {
//			},
//			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
//			}
//		});

		me.items = [me.createForm(cvicLookup,wkctLookup)];
		me.callParent(arguments);
		me.selectAction();
	},
	/**
	 * 화면폼
	 */
	createForm: function(cvicLookup,wkctLookup){
		var me = this,
			form = {
				xtype		: 'form-layout' ,
				region		: 'center',
				border		: false,
				items		: [ me.createGrid() ]  //me.createToolbar(),
			};
		return form;
	},

	/**
	 * 리스트
	 * @return {Ext.grid.Panel} 리스트 그리드
	 */
	createGrid: function(){
		var me = this,
			grid = {
				xtype		: 'grid-panel',
				region		: 'center',
				cls: _global.options.work_book_tema+'grid',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel: {selType:'cellmodel'},
				features: [{ftype :'grid-summary'}],
				plugins : {ptype  :'cellediting-directinput', clicksToEdit: 1 },
				store		: Ext.create(me.store),
				dockedItems	: {
					xtype	: 'toolbar',
					dock	: 'bottom',
					items	: [
						'->' ,
						{xtype: 'button' , text : '<span class="btnTemp">확인</span>', iconCls: Const.FINISH.icon , scope: me, handler: me.finishAction, cls: 'button-style', width: 150,height:50},'-',
						{xtype: 'button' , text : '<span class="btnTemp">닫기</span>', iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style', width: 150,height:50}
					]
				},
				columns: [
					{	dataIndex: 'line_seqn'	, text : Language.get('cond_dvcd_name'	,'NO'	) , width : 40,
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'insp_sbsc_name'		, text : Language.get(''		,'검사항목'	) , width : 150 , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'cond_name'		, text : Language.get('cond_name'		,'검사규격'		) , width : 120, align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'stup_veri'		, text : Language.get('stup_veri'		,'검사방법'	) , width : 100 , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex: 'unit_name'		, text : Language.get('unit_name'		,'확인주기'	) , width : 80 , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
					},{ dataIndex: 'frst_msmt'		, text : Language.get(''		,'초물'	) , width : 135  , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							var unit = meta.record.get('unit_name');
							if(unit =='시각'){
								if(value > 0 || value == "0000"){
									return value.substring(0,2)+':'+value.substring(2,4);
								}
							}
							return value;
						},
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							selectOnFocus: true,
							allowBlank	: false,
							listeners:{
								focus:function(comp,event){
									var	trigger1 = Ext.dom.Query.select('.trigger3')[0];
									var	grids = me.down('grid'),
										select = grids.getSelectionModel().getSelection()[0]
									;
									if(select.get('unit_name')=="시각"){
										this.popup.params = { stor_grp : _global.stor_grp, dvcd:1};
									}else{
										this.popup.params = { stor_grp : _global.stor_grp};
									}
									Ext.get(trigger1).dom.click();
								}
							},
							popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									var grids = me.down('grid');
									var select = grids.getSelectionModel().getSelection()[0];
									select.set('frst_msmt',records[0].result);
								}
							},
							trigger1Cls : 'hideCls trigger3',
						}
					},{ dataIndex: 'send_msmt'		, text : Language.get(''		,	'2Hr'	) , width : 135 , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							selectOnFocus: true,
							allowBlank	: false,
							listeners:{
								focus:function(){
									var trigger1 = Ext.dom.Query.select('.trigger2')[0];
									Ext.get(trigger1).dom.click();
								}
							},
							popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									var grids = me.down('grid');
									var select = grids.getSelectionModel().getSelection()[0];
									select.set('send_msmt',records[0].result);
								}
							},
							trigger1Cls : 'hideCls trigger2',
						}
					},{ dataIndex: 'thrd_msmt'		, text : Language.get(''		,	'중물'	) , width : 135 , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							selectOnFocus: true,
							allowBlank	: false,
							listeners:{
								focus:function(){
									var trigger1 = Ext.dom.Query.select('.trigger4')[0];
									Ext.get(trigger1).dom.click();
								}
							},
							popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									var grids = me.down('grid');
									var select = grids.getSelectionModel().getSelection()[0];
									select.set('thrd_msmt',records[0].result);
								}
							},
							trigger1Cls : 'hideCls trigger4',
						}
					},{ dataIndex: 'thrd_msmt'		, text : Language.get(''		,	'2Hr'	) , width : 135 , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							selectOnFocus: true,
							allowBlank	: false,
							listeners:{
								focus:function(){
									var trigger1 = Ext.dom.Query.select('.trigger4')[0];
									Ext.get(trigger1).dom.click();
								}
							},
							popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									var grids = me.down('grid');
									var select = grids.getSelectionModel().getSelection()[0];
									select.set('thrd_msmt',records[0].result);
								}
							},
							trigger1Cls : 'hideCls trigger4',
						}
					},{ dataIndex: 'thrd_msmt'		, text : Language.get(''		,	'종물'	) , width : 135 , align : 'center',
						renderer: function(value, meta){
							meta.style = 'font-size:1.8em !important;height:50px;line-height:50px;'; // applied style for DIV element
							return value;
						},
						tdCls	: 'editingcolumn',
						editor	: {
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							selectOnFocus: true,
							allowBlank	: false,
							listeners:{
								focus:function(){
									var trigger1 = Ext.dom.Query.select('.trigger4')[0];
									Ext.get(trigger1).dom.click();
								}
							},
							popup: {
								select	: 'SINGLE',
								widget	: 'lookup-keypad-popup',
								params	: { stor_grp : _global.stor_grp},
								result	: function(records, nameField, pairField){
									var grids = me.down('grid');
									var select = grids.getSelectionModel().getSelection()[0];
									select.set('thrd_msmt',records[0].result);
								}
							},
							trigger1Cls : 'hideCls trigger4',
						}
					}
				],
			}
		;
		return grid;
	},


	/**
	 * 조회
	 */
	selectAction: function(){
		var me		= this,
			store	= me.down('grid').getStore(),
			search	= Ext.ComponentQuery.query('module-dhtec-workenty-search')[0],
			value	= search.getValues(),
			select	= Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0].getSelectionModel().getSelection()[0]
		;
		store.load({
			params		: {param:JSON.stringify({hq_id:_global.hq_id,invc_date : value.work_date,wkct_idcd:value.wkct_name/*,cvic_idcd:select.get('cvic_idcd')*/ })},
			scope		: me,
			callback	: function(records, operation, success) {
			}
		});
	},
	/**
	 * 확인 버튼 이벤트
	 */
	finishAction: function(){
		var me			= this,
			panel		= me.down('grid'),
			store		= panel.getStore(),
			form		= me.down('panel'),
			invc_date	= form.down('[name=invc_date]').getValue(),
			wkct_idcd	= form.down('[name=wkct_name]').getValue(),
			changes		= store.getUpdatedRecords().length,
			select	= Ext.ComponentQuery.query('module-dhtec-workenty-detail')[0].getSelectionModel().getSelection()[0]
		;
		for(var i=0;i<changes;i++){
			store.getUpdatedRecords()[i].data.invc_date = me.Datafomat(new Date(invc_date)); //YYYYmmdd로 format
			store.getUpdatedRecords()[i].data.wkct_idcd = wkct_idcd;
//			store.getUpdatedRecords()[i].data.cvic_idcd = select.get('cvic_idcd');
		}
		store.sync({
			success : function(operation){ },
			failure : function(operation){ },
			callback : function(results, record ) {
				if (results.operations[0].success) {
					me.destroy();
				}
			},
			finished : function(results, record, operation){
				if (results.success){
					me.destroy();
				}
			}
		});
	},
	Datafomat : function(date){
	    var yyyy = date.getFullYear().toString();
	    var mm = (date.getMonth() + 1).toString();
	    var dd = date.getDate().toString();
	    return yyyy + (mm[1] ? mm : '0'+mm[0]) + (dd[1] ? dd : '0'+dd[0]);
	}
});
