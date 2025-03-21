Ext.define('module.custom.kortc.prod.workentry.view.WorkEntryListerDetail2', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-kortc-workentry-detail2'			,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	store		: 'module.custom.kortc.prod.workentry.store.WorkEntryDetail2',
	border		: 0,

	columnLines : false,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true,
		getRowClass:function(){
			return _global.hq_id+"cell";
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


	columnItem : function () {
		var me = this,
			item = {
				cls: _global.hq_id+'grid',
				defaults: {style: 'text-align: center;font-size:3em !important;'},
				items : [
					{	dataIndex: 'seqn'			, text : Language.get(''			,'순번'		) , width	: 50	, align : 'center',	sortable	: false
					},{	dataIndex: 'prog_stat_dvcd'	, text : Language.get(''			,'상태'		) , width	: 70	, xtype : 'lookupcolumn', lookupValue : resource.lookup('prog_stat_dvcd'), align : 'center',hidden:false,	sortable	: false
					},{	dataIndex: 'dayn_dvcd'		, text : Language.get(''			,'주/야'		) , width	: 50	, xtype : 'lookupcolumn', lookupValue : resource.lookup('dayn_dvcd'), align : 'center',hidden:false,	sortable	: false
					},{ dataIndex: 'wkod_seqn'		, text : Language.get(''			,'지시순번'	) , flex	: 2		, align : 'center'		, hidden:true,	sortable	: false
					},{ dataIndex: 'work_strt'		, text : Language.get(''			,'시작일시'	) , width 	: 100	, align  : 'center',	sortable	: false
					},{ dataIndex: 'work_endd'		, text : Language.get(''			,'종료(정지)일시'	) , width 	: 115	, align  : 'center',	sortable	: false
					},{ dataIndex: 'work_sttm'		, text : Language.get(''			,'시작일시'	) , width	: 75	, align : 'center', hidden:true,	sortable	: false
					},{ dataIndex: 'work_edtm'		, text : Language.get(''			,'종료일시'	) , width	: 75	, align : 'center', hidden:true,	sortable	: false
					},{ dataIndex: 'acpt_numb'		, text : Language.get(''			,'수주번호'	) , width	: 160	, hidden : true,	sortable	: false
					},{ dataIndex: 'lott_numb'		, text : Language.get(''			,'LOT번호'	) , width	: 100,	sortable	: false
					},{ dataIndex: 'item_code'		, text : Language.get(''			,'품목코드'	) , width	: 120,	sortable	: false
					},{ dataIndex: 'wkod_numb'		, text : Language.get(''			,'지시번호'	) , width	: 180	, hidden : true,	sortable	: false
					},{ dataIndex: 'item_name'		, text : Language.get(''			,'품명'		) , flex	: 1		, sortable	: false
					},{ dataIndex: 'item_spec'		, text : Language.get(''			,'규격'		) , flex	: 2		, hidden:true,	sortable	: false
					},{ dataIndex: 'indn_qntt'		, text : Language.get(''			,'지시수량'	) , width	: 95	, xtype:'numericcolumn',	sortable	: false
					},{ dataIndex: 'prod_qntt'		, text : Language.get(''			,'생산수량'	) , width	: 80	, xtype:'numericcolumn',	sortable	: false
					},{ dataIndex: 'acum_qntt'		, text : Language.get(''			,'누적수량'	) , width	: 95	, xtype:'numericcolumn',	sortable	: false
					},{ dataIndex: 'subs_qntt'		, text : Language.get(''			,'잔량'		) , width	: 95	, xtype:'numericcolumn',	sortable	: false,
						renderer:function(val,field,records){
							var value = records.get('indn_qntt')-records.get('acum_qntt');
							return Ext.util.Format.number(value, '0,000');
						}
					},{ dataIndex: 'wker_name'		, text : Language.get(''			,'관리자'	) , width	: 115	, align  : 'center',	sortable	: false
					},{ dataIndex: 'work_strt_dttm'	, text : Language.get(''			,'작업시작일'	) , width	: 115	, hidden:true,	sortable	: false
					},{ dataIndex: 'work_endd_dttm'	, text : Language.get(''			,'작업종료일'	) , width	: 115	, hidden:true,	sortable	: false
					},{ dataIndex: 'invc_date'		, text : Language.get(''			,'작업일자'	) , flex	: 2		, hidden:true,	sortable	: false
					},{ header: '실행',
						width : 150,
						sortable: false,
						align : 'center',
						renderer: function(val,meta,rec) {
							var id = Ext.id();
							Ext.defer(function() {
								Ext.widget('button', {
									width:70,
									height: 40,
									margin: "0 10px 0 0",
									renderTo: Ext.query("#"+id)[0],
									text: '<span class="btnTemp" style="font-size:1.5em;font-weight: bold;">수정</span>',
									cls:'btn btn-warning btnTemp '+_global.hq_id+'button',
									handler:  function(){me.iteminfo(rec)},
								});
								if(rec.get('prog_stat_dvcd')==3){
									Ext.widget('button', {
										width:70,
										height: 40,
										renderTo: Ext.query("#"+id)[0],
										text: '<span class="btnTemp" style="font-size:1.5em;font-weight: bold;">취소</span>',
										cls:'btn btn-danger btnTemp '+_global.hq_id+'button',
										handler:  function(){me.cancel(rec)},
									});
								}
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
	restart : function (rec) {
			var search = Ext.ComponentQuery.query('module-kortc-workentry-search')[0],
				searchDate = search.down('[name=work_date]').getValue(),
				cvic_idcd = search.down('[name=cvic_name]').getValue(),
				store = Ext.ComponentQuery.query('module-kortc-workentry-detail')[0].getStore()
				store2 = Ext.ComponentQuery.query('module-kortc-workentry-detail2')[0].getStore(),
				strt_dttm = ''
			;
			if(rec.get('work_strt_dttm')){
				strt_dttm = rec.get('work_strt_dttm').substr(0,10);
			}
			var	form = Ext.widget('form', {
					border: false,
					bodyPadding: 10,
					itemId : 'end',
					fieldDefaults: {
						labelWidth: 200,
						labelStyle: 'text-align:right',
						labelSeparator : '',
					},
					items:[
						{	fieldLabel	: Language.get('work_date','작업일자'),
							name		: 'invc_date',
							xtype		: 'datefield',
							width		: 535,
							height		: 50,
							labelStyle	: 'line-height: 75px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field readonlyfield',
							cls			: 'textTemp',
							trigger1Cls : _global.hq_id+'dateTrigger',
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: strt_dttm,
							maxValue	: rec.get('invc_date'),
							readOnly	: true
						},{	fieldLabel	: Language.get('work_edtm','종료시간'),
							name		: 'work_edtm',
							xtype		: 'timefield',
							format		: 'H:i',
							submitFormat: 'Hi',
							hideTrigger	: false,
							value		: rec.get('work_edtm'),
							minValue	: '00:00 AM',
							maxValue	: '23:59 PM',
							trigger1Cls : _global.hq_id+'trigger',											// trigger(버튼)에 클래스 추가
							width		: 533,
							height		: 50,
							labelStyle	: 'line-height: 75px;',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field readonlyfield',
							cls			: 'textTemp',
							listConfig:{
								itemCls		: _global.hq_id+'item'											// lookup list에 클래스 추가
							},
							readOnly	: true
						},{	fieldLabel	: Language.get('prod_qntt','생산수량'),
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'prod_qntt',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							width		: 548,
							height		: 50,
							labelStyle	: 'line-height: 75px;',
							trigger1Cls : _global.hq_id+'searchTrigger',
							labelCls	: 'textTemp '+_global.hq_id+'label',
							fieldCls	: 'textTemp '+_global.hq_id+'field',
							cls			: 'textTemp',
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger1')[0];
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
							trigger1Cls : 'hideCls trigger1',
						},{ xtype		: 'datefield',
							name		: 'work_endd_date',
							hidden		: true,
							format		: Const.DATE_FORMAT_YMD_BAR,
							submitFormat: Const.DATE_FORMAT_YMD,
							value		: new Date()
						}
					],
					buttons: [
						{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
							cls: 'button-style',
							flex:1,
							height:50,
							handler: function() {

							}
						},{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
							cls: 'button-style',
							flex:1,
							height:50,
							handler: function() {
								this.up('form').getForm().reset();

								Ext.ComponentQuery.query('#end')[0].up('window').destroy();
							}
						}
					]

				});

				win = Ext.widget('window', {
					title: '<span class="btnTemp" style="font-size:15px; color:black;">수정</span>',
					closeAction: 'destory',
					width: 650,
					height: 360,
					layout: 'fit',
					resizable: true,
					modal: true,
					items: form,
					defaultFocus: ''
				});
				win.show();
				win.tools.close.hide ();  // 닫기버튼 hide
	},
	cancel : function (rec) {
		var search = Ext.ComponentQuery.query('module-kortc-workentry-search')[0],
			searchDate = search.down('[name=work_date]').getValue(),
			cvic_idcd = search.down('[name=cvic_name]').getValue(),
			store = Ext.ComponentQuery.query('module-kortc-workentry-detail2')[0].getStore()
			store2 = Ext.ComponentQuery.query('module-kortc-workentry-detail')[0].getStore()
		;
		var	form = Ext.widget('form', {
				border: false,
				bodyPadding: 10,
				itemId:'cancle',
				fieldDefaults: {
					labelWidth: 200,
					labelStyle: 'text-align:right',
					labelSeparator : '',
				},
				items:[
					{	xtype		: 'label',
						text		: '취소하시겠습니까?',
						cls			: 'textTemp',
						style	: 'font-size:4em;'
					},{	fieldLabel	: Language.get('work_date','작업일자'),
						name		: 'invc_date',
						xtype		: 'datefield',
						value		: rec.get('invc_date'),
						format		: Const.DATE_FORMAT_YMD_BAR,
						submitFormat: Const.DATE_FORMAT_YMD,
						maxValue	: new Date(),
						hidden		: true
					}
				],
				buttons: [
					{	text: '<span class="btnTemp" style="font-size:3em">확인</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							var param = Ext.merge( this.up('form').getValues() );
							record = Ext.create( store.model.modelName , {
								invc_numb		: rec.get('invc_numb'),
								wkod_numb		: rec.get('wkod_numb'),
								wkod_seqn		: rec.get('wkod_seqn'),
								cvic_idcd		: rec.get('cvic_idcd'),
								pdsd_numb		: rec.get('pdsd_numb'),
								work_sttm		: rec.get('work_sttm'),
								prod_qntt		: rec.get('prod_qntt'),
								invc_date		: param.invc_date,
								work_edtm		: '',
								need_time		: ''
							});
							store.add(record);
							store.sync({
								callback: function(batch, options) {
									store.reload();
									this.up('form').getForm().reset();
									Ext.ComponentQuery.query('#cancle')[0].up('window').destroy();
								} ,
								scope: this
							},{	synchro : _global.objects.synchro,_set : 'cancel'} );
						}
					},
					{	text: '<span class="btnTemp" style="font-size:3em">취소</span>',
						cls: 'button-style',
						flex:1,
						height:50,
						handler: function() {
							this.up('form').getForm().reset();
							Ext.ComponentQuery.query('#cancle')[0].up('window').destroy();
						}
					}
				]

			});

			win = Ext.widget('window', {
				title: '<span class="btnTemp" style="font-size:15px; color:black;">취소</span>',
				closeAction: 'destroy',
				width: 500,
				height: 180,
				layout: 'fit',
				resizable: true,
				modal: true,
				items: form,
				defaultFocus: ''
			});
			win.show();
			win.tools.close.hide ();  // 닫기버튼 hide
	},
	//TODO 품목정보
	iteminfo : function (select) {
		var search     = Ext.ComponentQuery.query('module-kortc-workentry-search')[0],
			poor       = Ext.ComponentQuery.query('module-kortc-workentry-poor')[0],
			store      = Ext.ComponentQuery.query('module-kortc-workentry-lister')[0].getStore(),
			store2     = Ext.ComponentQuery.query('module-kortc-workentry-detail2')[0].getStore(),
			me         = this,
			index      = store2.indexOf(select),
			read       = true,
			shot       = 0
		;
		me.getSelectionModel().select(index);
		if((index == 0 && select.get('prog_stat_dvcd')!=3) || select.get('prog_stat_dvcd')==4){
			read = false;
		}
		Ext.Ajax.request({
			url			: _global.location.http() + '/custom/kortc/prod/workentry/get/realshot.do',
			method		: "POST",
			async		: false,
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					invc_numb		: select.get('invc_numb'),
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				shot = result.records[0].shot_cont;
			},
			failure : function(response, request) {
			},
			callback : function() {
			}
		});
		var form = Ext.widget('form', {
			border         : false,
			itemId         : 'info2',
			layout         : 'border',
			bodyPadding    : 5,
			fieldDefaults  : {
				labelWidth : 150,
				labelStyle : 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0', region:'north',
					items	: [
						{	xtype		: 'image',
							name		: 'image',
							id			: 'image',
							src			: '',
							width		: 207,
							height		: 310,
							margin		: '10 0 5 18',
							hidden		: false,
						},{	xtype		:'textfield',
							name		: 'item_imge',
							hidden		: true,
							value		: select.get('item_imge'),
							listeners	: {
								render:function(val){
									if(val.getValue()){
										img = new Uint8Array(val.getValue().split(","));
										blob = new Blob([img],{type:'image/png'})
										url = URL.createObjectURL(blob);
										this.up('form').down('[name=image]').setSrc(url);
									}else{
										this.up('form').down('[name=image]').setSrc('');
									}
								}
							}
						},{	xtype	: 'fieldset', layout: 'vbox' ,padding:'0', border: 0,margin : '10 0 5 0',
							items	: [
								{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('cvic_code','설비NO'),
											name		: 'cvic_code',
											xtype		: 'textfield',
											labelWidth	: 80,
											hideTrigger	: true,
											readOnly	: true,
											width		: 290,
											height		: 40,
											value		: select.get('cvic_code'),
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('work_sttm','작업시간'),
											name		: 'work_sttm',
											xtype		: 'timefield',
											format		: 'H:i',
											submitFormat: 'Hi',
											margin		: '0 0 0 10',
											hideTrigger	: true,
											labelWidth	: 90,
											value		: select.get('work_sttm'),
											minValue	: '00:00 AM',
											maxValue	: '23:59 PM',
											readOnly	: true,
											width		: 200,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('','~'),
											name		: 'work_edtm',
											xtype		: 'timefield',
											format		: 'H:i',
											submitFormat: 'Hi',
											margin		: '0 0 0 10',
											hideTrigger	: true,
											labelWidth	: 15,
											value		: select.get('work_edtm'),
											minValue	: '00:00 AM',
											maxValue	: '23:59 PM',
											readOnly	: true,
											width		: 125,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('cvic_drtr_name','설비관리자'),
											name		: 'cvic_drtr_name',
											pair		: 'cvic_drtr_idcd',
											xtype		: 'popupfield',
											labelWidth	: 95,
											margin		: '0 0 0 10',
											hideTrigger	: true,
											width		: 320,
											value		: select.get('cvic_drtr_name'),
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield',
											cls			: 'textTemp',
											popup: {
												select : 'SINGLE',
												widget : 'lookup-workentry-user-popup',
												params : { stor_grp : _global.stor_grp , row_sts : '0'},
												result	: function(records, nameField, pairField){
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
												}
											},
											trigger1Cls : 'hideCls trigger1',
											listeners	:{
												render:function(field ){
													field.getEl().on('click', function( event, el ) {
														var trigger1 = Ext.dom.Query.select('.trigger1')[0];
														Ext.get(trigger1).dom.click();
														console.log(select.get('cvic_drtr_name'));
													});
												}
											}
										},
									]
								},{	xtype	: 'textfield', name : 'cvic_drtr_idcd', hidden:true,
									listeners:{
										change:function(field,val){
											if(val!=''){
												Ext.Ajax.request({
													url			: _global.location.http() + '/custom/kortc/prod/workentry/set/cvic_drtr.do',
													method		: "POST",
													params		: {
														token	: _global.token_id,
														param	: Ext.encode({
															invc_numb		: select.get('invc_numb'),
															cvic_drtr_idcd	: val
														})
													},
													success : function(response, request) {
														store2.reload();
													},
													failure : function(response, request) {
														resource.httpError(response);
													},
													callback : function() {
													}
												});
											}
										}
									}
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('invc_numb','지시번호'),
											name		: 'invc_numb',
											xtype		: 'textfield',
											labelWidth	: 80,
											hideTrigger	: true,
											readOnly	: true,
											width		: 290,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp',
											value		: select.get('invc_numb')
										},{	fieldLabel	: Language.get('acpt_numb','수주번호'),
											name		: 'wkod_numb',
											xtype		: 'textfield',
											value		: select.get('acpt_numb'),
											margin		: '0 0 0 10',
											hideTrigger	: true,
											labelWidth	: 90,
											height		: 40,
											readOnly	: true,
											width		: 335,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('','금형이상'),
											name		: 'mold_repa',
											xtype		: 'lookupfield',
											lookupValue	: [['N/A','N/A']].concat(resource.lookup('yorn')),
											labelWidth	: 95,
											margin		: '0 0 0 10',
											hideTrigger	: true,
											multiSelect	: false ,
											editable	: false,
											width		: 320,
											height		: 40,
											value		: select.get('mold_repa'),
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield',
											cls			: 'textTemp',
											listConfig	:{
												itemCls		: _global.options.work_book_tema+'item',											// lookup list에 클래스 추가
											},
											listeners	:{
												change	: function(){
													var val = this.getValue();
													if(val!=''){
														Ext.Ajax.request({
															url			: _global.api_host_info + '/' + _global.app_site + '/custom/kortc/prod/workentry/set/mold_repa.do',
															method		: "POST",
															params		: {
																token	: _global.token_id,
																param	: Ext.encode({
																	invc_numb		: select.get('invc_numb'),
																	mold_repa		: val,
																})
															},
															success : function(response, request) {
																var object = response,
																	result = Ext.decode(object.responseText)
																;
																me.getStore().reload();
															},
															failure : function(response, request) {
																resource.httpError(response);
															},
															callback : function() {
															}
														});
													}
												}
											}
										}
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('lott_numb','LOT번호'),
											name		: 'lott_numb',
											xtype		: 'textfield',
											hideTrigger	: true,
											value		: select.get('lott_numb'),
											labelWidth	: 80,
											readOnly	: true,
											width		: 290,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('mold_code','금형코드'),
											name		: 'mold_code',
											xtype		: 'textfield',
											margin		: '0 0 0 10',
											hideTrigger	: true,
											labelWidth	: 90,
											readOnly	: true,
											width		: 335,
											height		: 40,
											value		: select.get('mold_code'),
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp'
										},{	name		: 'cvic_name',
											xtype		: 'textfield',
				//							labelWidth	: 10,
											hideTrigger	: true,
											readOnly	: true,
											width		: 340,
											height		: 40,
											hidden		: true,
											value		: select.get('cvic_name'),
											margin		: '0 0 0 5',
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp'
										},,{	fieldLabel	: Language.get('wker_name','작업관리자'),
											name		: 'wker_name',
											pair		: 'wker_idcd',
											xtype		: 'popupfield',
											labelWidth	: 95,
											margin		: '0 0 0 10',
											hideTrigger	: true,
											width		: 320,
											value		: select.get('wker_name'),
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield',
											cls			: 'textTemp',
											popup: {
												select : 'SINGLE',
												widget : 'lookup-workentry-user-popup',
												params : { stor_grp : _global.stor_grp , row_sts : '0'},
												result	: function(records, nameField, pairField){
													nameField.setValue(records[0].get('user_name'));
													pairField.setValue(records[0].get('user_idcd'));
												}
											},
											trigger1Cls : 'hideCls trigger24',
											listeners	:{
												render:function(field ){
													field.getEl().on('click', function( event, el ) {
														var trigger1 = Ext.dom.Query.select('.trigger24')[0];
														Ext.get(trigger1).dom.click();
													});
												}
											}
										},{	xtype	: 'textfield', name : 'wker_idcd', hidden:true,
											listeners:{
												change:function(field,val){
													if(val!=''){
														Ext.Ajax.request({
															url			: _global.location.http() + '/custom/kortc/prod/workentry/set/cvic_drtr.do',
															method		: "POST",
															params		: {
																token	: _global.token_id,
																param	: Ext.encode({
																	invc_numb		: select.get('invc_numb'),
																	wker_idcd		: val
																})
															},
															success : function(response, request) {
																store2.reload();
															},
															failure : function(response, request) {
																resource.httpError(response);
															},
															callback : function() {
															}
														});
													}
												}
											}
										},
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('item_code','품목코드'),
											name		: 'item_code',
											xtype		: 'textfield',
											labelWidth	: 80,
											hideTrigger	: true,
											readOnly	: true,
											width		: 290,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp',
											value		: select.get('item_code')
										},{	fieldLabel	: Language.get('cavity','CAVITY'),
											name		: 'cavity',
											xtype		: 'textfield',
											hideTrigger	: true,
											value		: select.get('cavity'),
											margin		: '0 0 0 10',
											labelWidth	: 90,
											readOnly	: true,
											width		: 335,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('work_cavity','생산CAVITY'),
											name		: 'work_cavity',
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											labelWidth	: 95,
											margin		: '0 0 0 10',
											hideTrigger	: true,
											width		: 320,
											value		: select.get('work_cavity'),
											height		: 40,
											labelStyle	: 'line-height: 35px;font-size:1.5em !important;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield',
											cls			: 'textTemp',
											hideTrigger	: true,
											handleMouseEvents:true,
											popup: {
												select	: 'SINGLE',
												widget	: 'lookup-keypad-popup',
												params	: { stor_grp : _global.stor_grp},
												result	: function(records, nameField, pairField){
													nameField.setValue('1*'+records[0].result);
												}
											},
											trigger1Cls : 'hideCls triggerCavityKey',
											listeners	:{
												render:function(field ){
													field.getEl().on('click', function( event, el ) {
														var trigger1 = Ext.dom.Query.select('.triggerCavityKey')[0];
														Ext.get(trigger1).dom.click();
													});
												},
												change:function(field,val){
													if(val!=''){
														Ext.Ajax.request({
															url			: _global.location.http() + '/custom/kortc/prod/workentry/set/work_cavity.do',
															method		: "POST",
															params		: {
																token	: _global.token_id,
																param	: Ext.encode({
																	invc_numb		: select.get('invc_numb'),
																	cavity			: val
																})
															},
															success : function(response, request) {
																store2.reload();
															},
															failure : function(response, request) {
																resource.httpError(response);
															},
															callback : function() {
															}
														});
													}
												}
											}
										},
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('mtrl_name','재질'),
											name		: 'mtrl_name',
											xtype		: 'textfield',
											labelWidth	: 80,
											readOnly	: true,
											width		: 290,
											height		: 40,
											value		: select.get('mtrl_name'),
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('shot_cont','SHOT'),
											name		: 'shot',
											xtype		: 'textfield',
											margin		: '0 0 0 10',
											hideTrigger	: true,
											labelWidth	: 90,
											readOnly	: true,
											width		: 335,
											height		: 40,
											value		: shot,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('work_cycl_time','생산C/T'),
											name		: 'cycl_time',
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											labelWidth	: 95,
											margin		: '0 0 0 10',
											hideTrigger	: true,
											width		: 320,
											height		: 40,
											value		: select.get('cycl_time'),
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield',
											cls			: 'textTemp',
											hideTrigger	: true,
											handleMouseEvents:true,
											popup: {
												select	: 'SINGLE',
												widget	: 'lookup-keypad-popup',
												params	: { stor_grp : _global.stor_grp},
												result	: function(records, nameField, pairField){
													nameField.setValue(records[0].result);
												}
											},
											trigger1Cls : 'hideCls triggerKey',
											listeners	:{
												render:function(field ){
													field.getEl().on('click', function( event, el ) {
														var trigger1 = Ext.dom.Query.select('.triggerKey')[0];
														Ext.get(trigger1).dom.click();
													});
												},
												change:function(field,val){
													if(val!=''){
														Ext.Ajax.request({
															url			: _global.location.http() + '/custom/kortc/prod/workentry/set/cyclTime.do',
															method		: "POST",
															params		: {
																token	: _global.token_id,
																param	: Ext.encode({
																	invc_numb		: select.get('invc_numb'),
																	cycl_time		: val
																})
															},
															success : function(response, request) {
																store2.reload();
															},
															failure : function(response, request) {
																resource.httpError(response);
															},
															callback : function() {
															}
														});
													}
												}
											}
										},
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('item','품목'),
											name		: 'item_name',
											xtype		: 'textfield',
											value		: select.get('item_name'),
											labelWidth	: 80,
											hideTrigger	: true,
											readOnly	: true,
											width		: 635,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp'
										},{	fieldLabel	: Language.get('qc_poor_qntt','불량수량'),
											name		: 'qc_poor_qntt',
											xtype		: 'numericfield',
											margin		: '0 0 0 10',
											hideTrigger	: true,
											labelWidth	: 95,
											readOnly	: true,
											width		: 320,
											value		: select.get('qc_poor_qntt'),
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield readonlyfield',
											cls			: 'textTemp',
											hidden		: true
										},{	fieldLabel	: Language.get('prod_qntt','생산수량'),
											name		: 'prod_qntt',
											xtype		: 'popupfield',
											editable	: true,
											enableKeyEvents : true,
											labelWidth	: 95,
											margin		: '0 0 0 10',
											width		: 320,
											value		: select.get('prod_qntt'),
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield',
											cls			: 'textTemp',
											hideTrigger	: true,
											handleMouseEvents:true,
											popup: {
												select	: 'SINGLE',
												widget	: 'lookup-keypad-popup',
												params	: { stor_grp : _global.stor_grp},
												result	: function(records, nameField, pairField){
													nameField.setValue(records[0].result);
												}
											},
											trigger1Cls : 'hideCls triggers2',
											listeners	:{
												render:function(field ){
													field.getEl().on('click', function( event, el ) {
														var trigger1 = Ext.dom.Query.select('.triggers2')[0];
														Ext.get(trigger1).dom.click();
													});
												},
												change	: function(){
													var val = this.getValue();
													var work_endd_date	= select.get('work_endd_dttm').substring(0,10),
														work_edtm		= select.get('work_endd_dttm').substring(11).replace(/:/gi,"")
													;
													if(select.get('prod_qntt') != val){
														if(val==null||val==''){
															Ext.Msg.alert("알림","생산수량을 반드시 입력해주십시오.");
														}else{
															Ext.Ajax.request({
																url			: _global.api_host_info + '/' + _global.app_site + '/custom/kortc/prod/workentry/set/prod_qntt.do',
																method		: "POST",
																params		: {
																	token	: _global.token_id,
																	param	: Ext.encode({
																		invc_numb	: select.get('invc_numb'),
																		prod_qntt	: val
																	})
																},
																success : function(response, request) {
																	var object = response,
																		result = Ext.decode(object.responseText)
																	;
																	store2.reload();
																},
																failure : function(response, request) {
																	resource.httpError(response);
																},
																callback : function() {
																}
															});
														}
													}
												}
											}
										},
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 20',
									items	: [
										{	fieldLabel	: Language.get('remk_text','비고사항'),
											name		: 'remk_text',
											xtype		: 'textfield',
											labelWidth	: 80,
											hideTrigger	: true,
											readOnly	: true,
											width		: 635,
											value		: select.get('remk_text'),
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo ',
											fieldCls	: 'readonlyfield',
											fieldStyle	: 'text-align: left;font-size:19px !important; ',
											cls			: 'textTemp',
										},{	fieldLabel	: Language.get('prog_stat_dvcd','상태'),
											name		: 'prog_stat_dvcd',
											xtype		: 'lookupfield',
											lookupValue	: [['',''],['3','종료']] ,
											labelWidth	: 95,
											margin		: '0 0 0 10',
											hideTrigger	: true,
											multiSelect	: false ,
											editable	: false,
											width		: 320,
											height		: 40,
											labelStyle	: 'line-height: 35px;',
											labelCls	: 'textTemp '+_global.hq_id+'iteminfo',
											fieldCls	: 'textTemp '+_global.hq_id+'iteminfoPopupfield',
											cls			: 'textTemp',
											readOnly	: read,
											listConfig	:{
												itemCls		: _global.options.work_book_tema+'item',											// lookup list에 클래스 추가
											},
											listeners	:{
												change	: function(){
													var work_endd_dttm = Ext.Date.format(new Date(select.get('work_endd_dttm')),'Ymdhis');
													var val = this.getValue();
													if(val!=''){
														Ext.Ajax.request({
															url			: _global.api_host_info + '/' + _global.app_site + '/custom/kortc/prod/workentry/set/stat_dvcd_update.do',
															method		: "POST",
															params		: {
																token	: _global.token_id,
																param	: Ext.encode({
																	invc_numb		: select.get('invc_numb'),
																	invc_date		: select.get('invc_date'),
																	wkod_numb		: select.get('wkod_numb'),
																	wkod_seqn		: select.get('wkod_seqn'),
																	work_endd_dttm	: work_endd_dttm,
																	prog_stat_dvcd	: val,
																})
															},
															success : function(response, request) {
																var object = response,
																	result = Ext.decode(object.responseText)
																;
																me.getStore().reload();
															},
															failure : function(response, request) {
																resource.httpError(response);
															},
															callback : function() {
															}
														});
													}
												}
											}
										},
									]
								},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '5 0 0 0',
									items	: [
										{	text : '<span class="btnTemp" style="font-size:2.5em;">불량보고</span>'  ,
											xtype : 'button',
											handler:  function(){
												if(!select){
													Ext.Msg.alert("알림","불량을 등록할 내역을 선택하여주십시오.");
												}else{
													me.poor()
												}
											},
											cls: 'button-left btn btn-danger',
											width: 150,
											height: 50,
											margin: '0 0 0 237'
										},{	text : '<span class="btnTemp" style="font-size:2.5em;">유실보고</span>'  ,
											xtype : 'button',
											handler:  function(){
												if(!select){
													Ext.Msg.alert("알림","유실 보고할 내역을 선택하여주십시오.");
												}else{
													me.fail()
												}
											},
											cls: 'button-left btn btn-warning',
											width: 150,
											height: 50,
											margin: '0 0 0 446'
										}
									]
								}
							]
						}
					]
				},{	xtype : 'module-kortc-workentry-poor', region:'west' , flex : 1, height:200 ,margin: '0 0 0 17'
				},{	xtype : 'module-kortc-workentry-fail',region:'center', flex : 1, height:200 ,margin: '0 17 0 0'
				}
			],
			buttons: [
				{	text	: '<span class="btnTemp" style="font-size:3em">닫기</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						Ext.ComponentQuery.query('#info2')[0].up('window').destroy();
					}
				}
			]
		});


		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:15px; color:black;">생산정보</span>',
			closeAction	: 'destory',
			width		: 1249,
			height		: 844,
			layout		: 'fit',
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();  // 닫기버튼 hide
	},
	//TODO 불량내역
	poor : function (rec) {
		var search     = Ext.ComponentQuery.query('module-kortc-workentry-search')[0],
			poorLookup = new Array(),
			me         = this
		;
		var form = Ext.widget('form', {
			border         : false,
			itemId         : 'poor',
			bodyPadding    : 10,
			fieldDefaults  : {
				labelWidth     : 150,
				labelStyle     : 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype		: 'label',
					text		:'불량유형과 수량을 입력하여 주십시오.',
					style		: {
						fontSize: '20px',
						color	: 'darkblue'
					},
					cls			: 'textTemp',
					margin		: '0 0 0 230'
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '0 0 0 20',
					items	: [
						{	fieldLabel	: Language.get('poor_name', '불량유형'),
							labelCls	: 'textTemp '+_global.hq_id+'label',												// label에 클래스추가
							fieldCls	: 'textTemp '+_global.hq_id+'field readonlyfield',												// field에 클래스추가
							xtype		: 'textfield',
							name		: 'poor_name',
							width		: 320,
							height		: 50,
							readOnly	: true,
							labelWidth	: 130,
							margin		: '20 0 0 0'
						},{ xtype:'textfield', name : 'poor_bacd',hidden:true
						},{	fieldLabel	: Language.get('poor_qntt', '수량'),
							labelCls	: 'textTemp '+_global.hq_id+'label',												// label에 클래스추가
							fieldCls	: 'textTemp '+_global.hq_id+'field',												// field에 클래스추가
							xtype		: 'popupfield',
							editable	: true,
							enableKeyEvents : true,
							name		: 'poor_qntt',
							width		: 320,
							height		: 50,
							labelWidth	: 130,
							margin		: '20 0 0 0',
							listConfig	:{
								itemCls	: _global.hq_id+'item'											// lookup list에 클래스 추가
							},
							handleMouseEvents:true,
							listeners:{
								render:function(field ){
									field.getEl().on('click', function( event, el ) {
										var trigger1 = Ext.dom.Query.select('.trigger21')[0];
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
							trigger1Cls : 'hideCls trigger21',
						}
					]
				}
			],
			buttons: [
				{	text	: '<span class="btnTemp" style="font-size:3em">확인</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						var form		= this.up('form'),
							poor_bacd	= form.down('[name=poor_bacd]'),
							poor_name	= form.down('[name=poor_name]')
						;
						if(poor_bacd.getValue()){
							me.poorupdate(form.getValues());
						}else{
							return;
						}
						win.destroy();
					}
				},{	text	: '<span class="btnTemp" style="font-size:3em">취소</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						this.up('form').getForm().reset();
						win.destroy();
					}
				}
			]
		});
		var array;
		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/basic/basemast/get/search2.do',
			method		: "POST",
			async: false,
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					prnt_idcd	: "6000",
					hqof_idcd	: _global.hqof_idcd,
					stor_grp	: _global.stor_grp
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if(result.records.length){
					array = result.records;
				}
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		var point = 4;
		for (var i = 0; i < array.length; i++) {
			form.insert(point,{	xtype   : 'button',
				text    : '<span class="btnTemp" style="font-size:2em;color:white;">'+array[i].base_name+'</span>',
				cls     : 'poorbutton-style',
				itemId	: i,
				width   : 150,
				height  : 50,
				margin  :'30 0 0 30',
				listeners :{
					click : function(){
						var form		= this.up('form'),
							poor_bacd	= form.down('[name=poor_bacd]'),
							poor_name	= form.down('[name=poor_name]')
						;
						poor_bacd.setValue(array[this.itemId].base_code);
						poor_name.setValue(array[this.itemId].base_name);
					}
				}
			});
			point++;
		}
		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:16px; color:black;">불량보고</span>',
			closeAction	: '',
			width		: 780,
			height		: 620,
			layout		: 'fit',
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();  // 닫기버튼 hide
	},
	//TODO 유실보고
	fail : function (rec) {
		var search     = Ext.ComponentQuery.query('module-kortc-workentry-search')[0],
			me         = this
		;
		var form = Ext.widget('form', {
			border         : false,
			itemId         : 'fail',
			bodyPadding    : 10,
			fieldDefaults  : {
				labelWidth : 150,
				labelStyle : 'text-align:right',
				labelSeparator : '',
			},
			items:[
				{	xtype		: 'label',
					text		:'유실유형과 시간을 선택하여 주십시오.',
					style		: {
						fontSize: '20px',
						color	: 'darkblue'
					},
					cls			: 'textTemp',
					margin		: '0 0 10 110'
				},{	fieldLabel	: Language.get('loss_resn_name', '유실유형'),
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',												// label에 클래스추가
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field readonlyfield',												// field에 클래스추가
					xtype		: 'textfield',
					name		: 'loss_resn_name',
					width		: 413,
					height		: 50,
					maxWidth	: 500,
					readOnly	: true,
					labelWidth	: 210,
					margin		: '20 0 0 0'
				},{ xtype:'textfield', name : 'loss_resn_dvcd',hidden:true
				},{	xtype	: 'fieldset', layout: 'hbox' ,padding:'0', border: 0,margin : '10 0 5 0',
					items	: [
						{	fieldLabel	: Language.get('sttm','시간'),
							name		: 'sttm',
							xtype		: 'timefield',
							format		: 'H:i',
							labelWidth	: 100,
							submitFormat: 'Hi',
							value		: new Date(),
							minValue	: '00:00 AM',
							maxValue	: '23:59 PM',
							margin		: '0 0 0 70',
							readOnly	: false,
							width		: 220,
							height		: 50,
							labelStyle	: 'line-height: 45px;',
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'popupfield', editable : true,
							trigger1Cls :_global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
							listConfig:{
								itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
							},
							cls			: 'textTemp'
						},{	fieldLabel	: Language.get('','~'),
							name		: 'edtm',
							xtype		: 'timefield',
							format		: 'H:i',
							submitFormat: 'Hi',
							margin		: '0 0 0 10',
							labelWidth	: 15,
							value		: '',
							minValue	: '00:00 AM',
							maxValue	: '23:59 PM',
							readOnly	: false,
							margin		: '0 0 0 50',
							width		: 135,
							height		: 50,
							labelStyle	: 'line-height: 45px;',
							labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
							fieldCls	: 'textTemp '+_global.options.work_book_tema+'popupfield', editable : true,
							trigger1Cls : _global.options.work_book_tema+'trigger',											// trigger(버튼)에 클래스 추가
							listConfig:{
								itemCls		: _global.options.work_book_tema+'item'											// lookup list에 클래스 추가
							},
							cls			: 'textTemp'
						}
					]
				}
			],
			buttons: [
				{	text	: '<span class="btnTemp" style="font-size:3em">확인</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						var form			= this.up('form'),
							loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]'),
							loss_resn_name	= form.down('[name=loss_resn_name]')
						;
						if(loss_resn_dvcd){
							me.failupdate(form.getValues());
						}else{
							return;
						}
//						form.getForm().reset();
						win.destroy();
					}
				},{	text	: '<span class="btnTemp" style="font-size:3em">취소</span>',
					cls		: 'button-style',
					flex	: 1,
					height	:50,
					handler	: function() {
						this.up('form').getForm().reset();
						win.destroy();
//						Ext.ComponentQuery.query('#fail')[0].up('window').destroy();
					}
				}
			]
		});
		var array2;
		Ext.Ajax.request({
			url			: _global.api_host_info + '/' + _global.app_site + '/basic/basemast/get/search2.do',
			method		: "POST",
			async: false,
			params		: {
				token	: _global.token_id,
				param	: Ext.encode({
					prnt_idcd	: "6100",
					hqof_idcd	: _global.hqof_idcd,
					stor_grp	: _global.stor_grp
				})
			},
			success : function(response, request) {
				var object = response,
					result = Ext.decode(object.responseText)
				;
				if(result.records.length){
					array2 = result.records;
				}
			},
			failure : function(response, request) {
				resource.httpError(response);
			},
			callback : function() {
			}
		});
		var point2 = 4;
		for (var i = 0; i < array2.length; i++) {
			form.insert(point2,						//위치
				{	xtype	: 'button',
					text    : '<span class="btnTemp" style="font-size:2em;color:white;">'+array2[i].base_name+'</span>',
					itemId	: i,
					listeners :{
						click : function(){
							var form			= this.up('form'),
								loss_resn_name	= form.down('[name=loss_resn_name]'),
								loss_resn_dvcd	= form.down('[name=loss_resn_dvcd]')
							;
							loss_resn_dvcd.setValue(array2[this.itemId].base_code);
							loss_resn_name.setValue(array2[this.itemId].base_name);
						}
					},
					cls     : 'failbutton-style',
					width   : 150,
					height  : 50,
					margin  :'30 0 0 30'
				}
			);
			point2++;
		}
		win = Ext.widget('window', {
			title		: '<span class="btnTemp" style="font-size:16px; color:black;">유실보고</span>',
			closeAction	: 'destory',
			width		: 586,
			height		: 610,
			layout		: 'fit',
			resizable	: true,
			modal		: true,
			items		: form,
			defaultFocus: ''
		});
		win.show();
		win.tools.close.hide ();  // 닫기버튼 hide
	},
	//TODO 불량 업로드 function
	poorupdate : function (param) {
		var me = this,
			poor_qntt = param.poor_qntt,
			poor_bacd = param.poor_bacd,
			poor      = Ext.ComponentQuery.query('module-kortc-workentry-poor')[0],
			select    = me.getSelectionModel().getSelection()[0],
			line_seqn = 0,
			sttm1      = select.get('work_sttm'),
			edtm1      = select.get('work_edtm'),
			sttm       = null,
			edtm       = ''
		;
		if(poor_bacd==''||poor_bacd==null){
			Ext.Msg.alert("알림","불량유형을 반드시 선택하여 주십시오.");
		}
		if(poor_qntt==0||poor_qntt==''||poor_qntt==null){
			Ext.Msg.alert("알림","불량수량을 반드시 입력하여 주십시오.");
		}else{
			if(sttm1!=null||sttm1!=undefined){
				sttm = sttm1.replace(':','');
			}
			if(edtm1!=null||edtm1!=undefined){
				edtm = edtm1.replace(':','');
			}
			//line_seqn count
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/kortc/prod/workentry/get/poorseqn.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: select.get('invc_numb')
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					if	(!result.success ){
						return;
					} else {
					}
					line_seqn = result.records[0].line_seqn;
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				}
			});
			line_seqn= line_seqn+1;
			Ext.Ajax.request({
				url		: _global.location.http() + '/custom/kortc/prod/workentry/set/poor.do',
				params	: {
					token : _global.token_id,
					param : JSON.stringify({
						_set			: 'insert',
						stor_id			: _global.stor_id,
						hqof_idcd		: _global.hqof_idcd,
						invc_numb		: select.get('invc_numb'),
						line_seqn		: line_seqn,
						invc_date		: select.get('invc_date'),
						poor_bacd		: poor_bacd,
						sttm			: sttm,
						edtm			: edtm,
						wker_idcd		: select.get('wker_idcd'),
						good_qntt		: null,
						poor_qntt		: poor_qntt,
						loss_qntt		: null,
						runn_dsct_yorn	: null
					})
				},
				async	: false,
				method	: 'POST',
				success	: function(response, request) {
					var result = Ext.decode(response.responseText);
					console.log(result);
					if	(!result.success ){
						return;
					} else {
					}
				},
				failure : function(result, request) {
				},
				callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
					Ext.ComponentQuery.query('#poor')[0].up('window').destroy();
					poor.getStore().reload();
				}
			});
		}
	},

	//TODO 유실보고 업로드 function
	failupdate : function (param) {
		var me = this,
			sttm1     = param.sttm,
			edtm1     = param.edtm,
			loss_resn_dvcd     = param.loss_resn_dvcd,
			sttm      = sttm1.replace(':',''),
			edtm      = '',
			fail      = Ext.ComponentQuery.query('module-kortc-workentry-fail')[0],
			select    = me.getSelectionModel().getSelection()[0],
			line_seqn = 0,
			loss_time = 0,
			sttm_hour = sttm.substring(0,2),
			sttm_min  = sttm.substring(2,4),
			edtm_hour  = '';
			edtm_min  = '',
			time = 0,
			min  = 0
		;
		if(edtm1){
			edtm		= edtm1.replace(':','')+"00";
			edtm_hour	= edtm.substring(0,2);
			edtm_min	= edtm.substring(2,4)
			time		= edtm_hour-sttm_hour;
			min			= edtm_min-sttm_min
		}
		if(loss_resn_dvcd==null||loss_resn_dvcd==''){
			Ext.Msg.alert("알림","유실유형을 선택하여주십시오.");
			return;
		}

		if(min < 0){
			time = time-1;
			min  = min + 60;
		}
		if(time < 0){
			time = time+24;
		}
		var total = (time*60)+min;
		//line_seqn count
		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/kortc/prod/workentry/get/failseqn.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					invc_numb		: select.get('invc_numb')
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
				}
				line_seqn = result.records[0].line_seqn;
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
			}
		});
		line_seqn= line_seqn+1;

		Ext.Ajax.request({
			url		: _global.location.http() + '/custom/kortc/prod/workentry/set/fail.do',
			params	: {
				token : _global.token_id,
				param : JSON.stringify({
					_set			: 'insert',
					stor_id			: _global.stor_id,
					hqof_idcd		: _global.hqof_idcd,
					invc_numb		: select.get('invc_numb'),
					line_seqn		: line_seqn,
					invc_date		: select.get('invc_date'),
					cvic_idcd		: select.get('cvic_idcd'),
					loss_resn_dvcd	: loss_resn_dvcd,
					sttm			: sttm+'00',
					edtm			: edtm,
					loss_time		: total,
					loss_pcnt		: 0,
					loss_mnhr		: 0,
					work_dsct_yorn	: 0,
				})
			},
			async	: false,
			method	: 'POST',
			success	: function(response, request) {
				var result = Ext.decode(response.responseText);
				if	(!result.success ){
					return;
				} else {
				}
			},
			failure : function(result, request) {
			},
			callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
				Ext.ComponentQuery.query('#fail')[0].up('window').destroy();
				fail.getStore().reload();
			}
		});
	},

});