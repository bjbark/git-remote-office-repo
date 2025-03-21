Ext.define('module.custom.kitec.prod.workentry.view.WorkEntryListerMaster', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-kitec-workenty-lister'			,
	selModel	: { selType: 'checkboxmodel', mode : 'MULTI' },
	store		: 'module.custom.kitec.prod.workentry.store.WorkEntry',
	border		: 0,

	columnLines : false,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.options.work_book_tema+"cell";
		}
	},
	initComponent: function () {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	pagingItem : function () {
		var me = this,
			item = {
				xtype	: 'grid-paging',
				items	: [
				]
			};
		return item ;
	},
	listeners:{
		afterrender:function(){
			var sideButton = Ext.dom.Query.select('#mainmenu-splitter-collapseEl')[0];
			setTimeout(function() {
				sideButton.click();
			}, 100);
		}
	},


	columnItem : function () {
		var me = this,
			item = {
				cls: _global.options.work_book_tema+'grid',
				defaults: {style: 'text-align: center;font-size:2.5em !important;'},
				items : [
					{	dataIndex: 'prog_stat_dvcd'	, text : Language.get('prog_stat_dvcd'	,'상태'		) , width : 60  , xtype : 'lookupcolumn', lookupValue : resource.lookup('prog_stat_dvcd'), align : 'center'
					},{ dataIndex: 'seqn'			, text : Language.get('seqn'			,'순번'		) , width : 45  , align : 'center',hidden:true
					},{ dataIndex: 'pdsd_date'		, text : Language.get('pdsd_date'		,'지시일자'	) , width : 120 , align : 'center'
					},{ dataIndex: 'pref_rank'		, text : Language.get('pref_rank'		,'우선순위'	) , width : 70  , align : 'center'
					},{ dataIndex: 'invc_numb'		, text : Language.get('ordr_numb'		,'작업지시번호') , width : 120 , align : 'center'
					},{ dataIndex: 'lott_numb'		, text : Language.get('lott_numb'		,'LOT번호'	) , width : 120 , align : 'center'
					},{ dataIndex: 'item_code'		, text : Language.get('item_code'		,'품목코드'	) , width : 125 , align : 'center'	, hidden : true
					},{ dataIndex: 'item_name'		, text : Language.get('item_name'		,'품명'		) , flex  : 1
					},{ dataIndex: 'indn_qntt'		, text : Language.get('indn_qntt'		,'지시수량'	) , width : 90  , xtype : 'numericcolumn'
					},{ dataIndex: 'invc_numb'		, text : Language.get('wkod_numb'		,'지시번호'	) , width : 220 , align : 'center'	, hidden : true
					},{ dataIndex: 'pdod_date'		, text : Language.get('pdod_date'		,'지시일자'	) , flex  : 2   , align : 'center'	, hidden : true
					},{ dataIndex: 'item_spec'		, text : Language.get('item_spec'		,'규격'		) , flex  : 2   , hidden: true
					},{ dataIndex: 'work_date'		, text : Language.get('work_date'		,'작업일자'	) , flex  : 2   , hidden: true
					},{ dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'		) , width : 60  , hidden: true
					},{ header: Language.get('action','실행'),
						sortable: false,
						width:130,
						align : 'center',
						renderer: function(val,meta,rec) {
							var id = Ext.id();
							Ext.defer(function() {
								Ext.widget('button', {
										renderTo: Ext.query("#"+id)[0],
										width:120,
										height: 40,
										text: '<span class="btnTemp" style="font-size:2em;font-weight: bold;">'+Language.get('start','시작')+'</span>',
										cls:'btn btn-success btnTemp '+_global.options.work_book_tema+'button',
										handler: function(){me.insert(rec)}
								});
							}, 50);
							return Ext.String.format('<div id="{0}"></div>', id);
						},
						dataIndex: 'somefieldofyourstore'
					}
				]
			}
		;
		return item;
	},
	insert : function (rec) {
		var search = Ext.ComponentQuery.query('module-kitec-workenty-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			wkct_idcd = search.down('[name=wkct_name]').getValue(),
			select = this.getSelectionModel().getSelection()[0],
			store = Ext.ComponentQuery.query('module-kitec-workenty-lister')[0].getStore(),
			store2 = Ext.ComponentQuery.query('module-kitec-workenty-detail')[0].getStore()
		;
		var	form = Ext.widget('form', {
			border: false,
			bodyPadding: 10,
			fieldDefaults: {
				labelWidth: 150,
				labelStyle: 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	fieldLabel	: Language.get('work_date','작업일자'),
					name		: 'invc_date',
					xtype		: 'datefield',
					value		: searchDate,
					width		: 435,
					height		: 50,
					readOnly	: true,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp',
					trigger1Cls : _global.options.work_book_tema+'dateTrigger',
					format		: Const.DATE_FORMAT_YMD_BAR,
					submitFormat: Const.DATE_FORMAT_YMD,
					maxValue	: new Date(),
					listeners:{
					}
				},{	fieldLabel	: Language.get('work_sttm','시작시간'),
					name		: 'work_sttm',
					xtype		: 'timefield',
					format		: 'H:i',
					submitFormat: 'Hi',
					hideTrigger	: true,
					readOnly	: true,
					value		: new Date(),
					minValue	: '00:00 AM',
					maxValue	: '23:59 PM',
					width		: 433,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp',
					listConfig:{
						itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
					},
				},{	fieldLabel	: Language.get('cvic','설비'),
					width		: 450,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					name		: 'cvic_name',
					pair		: 'cvic_idcd',
					value		: select.get('cvic_name'),
					trigger1Cls : _global.options.work_book_tema+'searchTrigger',
					clearable	: false ,
					popup: {
						select : 'SINGLE',
						widget : 'lookup-kitec-workentry-cvic-popup',
						params : { stor_grp : _global.stor_grp , row_sts : '0',wkct_idcd:rec.get('wkct_idcd')},
						result : function(records, nameField, pairField) {
							nameField.setValue(records[0].get('cvic_name'));
							pairField.setValue(records[0].get('cvic_idcd'));
						}
					}
				},{	name : 'cvic_idcd', xtype : 'textfield' , hidden : true , value:select.get('cvic_idcd')
				},{	fieldLabel	: Language.get('wker','작업자'),
					value		: '',
					width		: 450,
					height		: 50,
					labelStyle	: 'line-height: 75px;',
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					cls			: 'textTemp',
					xtype		: 'popupfield',
					editable	: true,
					enableKeyEvents : true,
					name		: 'wker_name',
					pair		: 'wker_idcd',
					trigger1Cls : _global.options.work_book_tema+'searchTrigger',
					clearable	: false ,
					popup: {
						select : 'SINGLE',
						widget : 'lookup-kitec-workenty-user-popup',
						params : { stor_grp : _global.stor_grp , row_sts : '0'},
						result : function(records, nameField, pairField) {
							nameField.setValue(records[0].get('user_name'));
							pairField.setValue(records[0].get('user_idcd'));
						}
					}
				},{	name : 'wker_idcd', xtype : 'textfield' , hidden : true
				},{	fieldLabel	: Language.get('shift', '작업조'),
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',												// field에 클래스추가
					xtype		: 'lookupfield',
					name		: 'dayn_dvcd',
					trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
					width		: 450,
					lookupValue	: resource.lookup('dayn_dvcd'),
					height		: 50,
					margin		: '15 0 0 0',
					multiSelect	: false ,
					editable	: false,
					listConfig:{
						itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
					},
				}
			],
			buttons: [
				{	text: '<span class="btnTemp" style="font-size:3em">'+Language.get('confirm', '확인')+'</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						var param = Ext.merge( this.up('form').getValues() );
						if(param.invc_date==null || param.invc_date ==''){
							Ext.Msg.alert("알림","작업일자를 반드시 입력해주십시오.");
						}else if(param.work_sttm==null || param.work_sttm ==''){
							Ext.Msg.alert("알림","시작시간를 반드시 입력해주십시오.");
						}else if(param.wker_idcd==null || param.wker_idcd ==''){
							Ext.Msg.alert("알림","작업자를 반드시 입력해주십시오.");
						}else if(param.dayn_dvcd==null || param.dayn_dvcd ==''){
							Ext.Msg.alert("알림","작업조를 반드시 입력해주십시오.");
						}else{
							var new_invc_numb,
								man_invc
							;
							Ext.Ajax.request({
								url		: _global.location.http() + '/listener/seq/maxid.do',
								params	: {
									token : _global.token_id,
									param : JSON.stringify({
										stor_id	: _global.stor_id,
										table_nm: 'work_book'
									})
								},
								async	: false,
								method	: 'POST',
								success	: function(response, request) {
									var result = Ext.decode(response.responseText);
									if	(!result.success ){
										Ext.Msg.error(result.message );
										return;
									} else {
										new_invc_numb = result.records[0].seq;
									}
								},
								failure : function(result, request) {
								},
								callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
								}
							});
							record = Ext.create( store.model.modelName , {
								invc_numb		: new_invc_numb,
								indn_qntt		: rec.get('indn_qntt'),
								pdsd_numb		: rec.get('pdsd_numb'),
								wkod_numb		: rec.get('invc_numb'),
								wkod_seqn		: rec.get('line_seqn'),
								item_idcd		: rec.get('wkct_item_idcd'),
								invc_date		: param.invc_date,
								wker_idcd		: param.wker_idcd,
								dayn_dvcd		: param.dayn_dvcd,
								work_sttm		: param.work_sttm+'00',
								wkct_idcd		: rec.get('wkct_idcd'),
								mold_idcd		: rec.get('mold_idcd'),
								mtrl_bacd		: rec.get('mtrl_bacd'),
								lott_numb		: rec.get('lott_numb'),
								cvic_idcd		: param.cvic_idcd,
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
									store2.reload();
									this.up('form').getForm().reset();
									this.up('window').hide();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'insert'} );
						}
					}
				},{	text: '<span class="btnTemp" style="font-size:3em">'+Language.get('cancel', '취소')+'</span>',
					cls: 'button-style',
					flex:1,
					height:50,
					handler: function() {
						this.up('form').getForm().reset();
						this.up('window').hide();
					}
				}
			]
		});
		win = Ext.widget('window', {
			title: '<span class="btnTemp" style="font-size:15px; color:black;">'+Language.get('start', '시작')+'</span>',
			closeAction: 'hide',
			width: 580,
			height: 520,
			layout: 'fit',
			resizable: true,
			modal: true,
			items: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();
	},

});