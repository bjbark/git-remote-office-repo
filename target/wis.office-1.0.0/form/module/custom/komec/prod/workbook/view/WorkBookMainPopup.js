Ext.define('module.custom.komec.prod.workbook.view.WorkBookMainPopup', { extend: 'Axt.popup.Search',
	id 		: 'lookup-komec-workbook-main-popup',
	alias	: 'widget.lookup-komec-workbook-main-popup',
	store	: 'module.custom.komec.prod.workbook.store.WorkBookMainPopup',

	title	: Language.get('main_popup','작업 공정 리스트'),
	closable: true,
	autoShow: true,
	width	: window.innerWidth,
	height	: window.innerHeight,
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
		me.selectAction();
	},
	listeners:{
		afterrender:function(){
			var me = this;
			me.getState();
			window.cvicstate = setInterval(function(){
				me.getState();
			},3000)
		},
		destroy:function(){
			clearInterval(cvicstate);
		}
	},
	/**
	 * 화면폼
	 */
	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout' ,
				layout		: 'border',
				region		: 'center',
				border		: false,
				items		: [ me.createGrid(),me.rightForm() ]  //me.createToolbar(),
			};
		return form;
	},

	rightForm: function(){
		var me = this,
			form = {
				xtype		: 'form-search',
				border	: false,
				layout	: 'fit',
				region	: 'east',
				bodyPadding: 10,
				fieldDefaults: {
					labelCls	: 'textTemp '+_global.options.work_book_tema+'label',
					fieldCls	: 'textTemp '+_global.options.work_book_tema+'field',
					labelStyle	: 'text-align:right;font-size:20px;line-height:49px !important',
					fieldStyle	: 'font-size:20px !important;',
					labelSeparator : '',
					width		: 230,
					margin		: '5 0 0 0',
					border : 0,
				},
				items:[
					{	layout : {type:'vbox', align: 'stretch' },
						flex : 1,
						border	: 0,
						items:[
							{ layout : {type:'vbox', align: 'stretch' },
								flex : 1,
								border	: 0,
								items:[
									{ layout : {type:'vbox', align: 'stretch' },
										flex : 1,
										border	: 0,
										items:[
											{	layout : {type:'hbox', align: 'stretch' },
												border	: 0,
												flex : 1,
												items:[
													{	xtype	: 'textfield',
														name	: 'clock',
														flex	: 3,
														listeners:{
															render:function(a,b){
																window.realTime = setInterval(function(){
																	var y,m,d,h,i,s,date = new Date();

																	y = date.getFullYear();
																	m = (date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1);
																	d = date.getDate()<10?'0'+date.getDate():date.getDate();
																	h = date.getHours()<10?'0'+date.getHours():date.getHours();
																	i = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
																	s = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();

																	a.setValue(y+'-'+m+'-'+d+' '+h+':'+i+':'+s);
																}, 100)
															},
														}
													},
													{	xtype	: 'button',
														text	: '<span class="btnTemp" style="font-size:2.5em;">닫기</span>',
														cls		: 'button-right btn btn-danger',
														style	: 'text-decoration:none;',
														handler:function(){
															var	grid  = Ext.ComponentQuery.query('module-komec-workbook-detail')[0],
																store = grid.getStore()
															;
															store.reload();
															this.up('window').destroy();
														},
														flex	: 1
													},
												]
											},{	layout : {type:'hbox', align: 'stretch' },
												border	: 0,
												flex : 1,
												padding : 5,
												items:[
													{	xtype	: 'button',
														text	: '<span class="btnTemp" style="font-size:2.5em;">시작</span>',
														cls		: 'btn btn-success',
														margin	: 5,
														flex	: 1,
														action  : 'mainStart'
													},
													/**
													*    중단은 없다고함.
													*/
//													{	xtype	: 'button',
//														text	: '<span class="btnTemp" style="font-size:2.5em;">중단</span>',
//														cls		: 'btn btn-primary',
//														margin	: 5,
//														flex	: 1,
//														action  : 'mainStop'
//													},
													{	xtype	: 'button',
														text	: '<span class="btnTemp" style="font-size:2.5em;">종료</span>',
														cls		: 'btn btn-warning',
														margin	: 5,
														flex	: 1,
														action  : 'mainEnd'
													},
												]
											},{	layout : {type:'hbox', align: 'stretch' },
												border	: 0,
												flex : 1,
												items:[
													{	fieldLabel	: '온도',
														xtype		: 'numericfield',
														name		: 'temp',
														readOnly	: true,
														labelStyle	: 'text-align:right;font-size:35px;margin:30 0 0 0',
														flex		: 1,
														listeners	: {
															render	:function(field){

															}
														}
													},{	fieldLabel	: 'RPM',
														name		: 'rpm',
														xtype		: 'numericfield',
														labelStyle	: 'text-align:right;font-size:35px;margin:30 0 0 0',
														readOnly	: true,
														flex		: 1
													},
												]
											},{	layout : {type:'hbox', align: 'stretch' },
												border	: 0,
												flex : 1,
												padding : 5,
												items:[
													{	xtype	: 'button',
														text	: '<span class="btnTemp" style="font-size:2.5em;">불량</span>',
														cls		: 'btn btn-danger',
														margin	: 5,
														flex	: 1,
														action	: 'mainPoor'
													},{	xtype	: 'button',
														text	: '<span class="btnTemp" style="font-size:2.5em;">유실</span>',
														cls		: 'btn btn-warning',
														margin	: 5,
														flex	: 1,
														action	: 'mainFail'
													}
												]
											},{	layout : {type:'hbox', align: 'stretch' },
												border	: 0,
												flex : 1,
												padding : 5,
												items:[
													{	xtype	: 'button',
														text	: '<span class="btnTemp" style="font-size:2.5em;">자재투입</span>',
														cls		: 'btn btn-primary',
														margin	: 5,
														flex	: 1,
														action	: 'mtrlinput'
													},
													{	xtype	: 'button',
														text	: '<span class="btnTemp" style="font-size:2.5em;">제품첨가</span>',
														cls		: 'btn btn-primary',
														margin	: 5,
														flex	: 1,
														action	: 'iteminput'
													},
													{	xtype	: 'button',
														text	: '<span class="btnTemp" style="font-size:2.5em;">검사입력</span>',
														cls		: 'btn btn-primary',
														margin	: 5,
														flex	: 1,
														action	: 'castCond'
													}
												]
											},{	layout : {type:'hbox', align: 'stretch' },
												border	: 0,
												flex : 1,
												items:[
													{	fieldLabel	: Language.get('item_name','품명'),
														labelStyle	: 'text-align:right;font-size:35px;margin:30 0 0 0',
														xtype		: 'textfield',
														name		: 'item_name',
														readOnly	: true,
														editable	: false,
														flex		: 1
													},
												]
											},{	layout : {type:'hbox', align: 'stretch' },
												border	: 0,
												flex : 3,
												items:[
													{	xtype	: 'textarea',
														name	: 'user_memo',
														readOnly: true,
														editable: false,
														flex	: 1,
														fieldStyle	: 'font-size:2.7em !important;'
													},
												]
											}
										]
									}
								]
							}
						]
					}
				]
			}
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
				itemId		: 'mainLister',
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel	: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store		: Ext.create(me.store),
				cls : _global.options.work_book_tema + 'grid',
				defaults : {
					style : 'text-align: center;font-size:2.5em !important;'
				},
				columns: [
					{	dataIndex:	'line_seqn' , width:  70, align : 'center' , text: Language.get( 'line_seqn'      , '순번'           ),
						renderer: function(value, meta){
							meta.style = 'font-size:2.5em !important;height:40px;line-height:40px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex:	'prog_stat_dvcd'      	, width:  120, align : 'center' , text: Language.get( 'prog_stat_dvcd'      , '상태'           ),
						renderer: function(value, meta){
							meta.style = 'font-size:2.5em !important;height:40px;line-height:40px;'; // applied style for DIV element
							var result = "";
							Ext.each(resource.lookup('prog_stat_dvcd'),function(rec){
								if(rec[0]==value){
									result = rec[1];
								}
							});

							return result;
						},
					},{	dataIndex:	'wkct_name'      	, flex : 1 , minWidth : 400, align : 'left'   , text: Language.get( 'wkct_name'      , '공정명'             ),
						renderer: function(value, meta){
							meta.style = 'font-size:2.5em !important;height:40px;line-height:40px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex:	'work_strt_dttm'      	, width: 180, align : 'left'   , text: Language.get( 'work_strt_dttm'      , '시작시간'             ),
						renderer: function(value, meta){
							meta.style = 'font-size:1.5em !important;height:40px;line-height:40px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex:	'work_endd_dttm'      	, width: 180, align : 'left'   , text: Language.get( 'work_endd_dttm'      , '종료시간'             ),
						renderer: function(value, meta){
							meta.style = 'font-size:1.5em !important;height:40px;line-height:40px;'; // applied style for DIV element
							return value;
						},
					},{	dataIndex:	'wkrn_name'      	, width: 150, align : 'left'   , text: Language.get( 'wkrn_name'      , '작업자'           ),
						renderer: function(value, meta){
							meta.style = 'font-size:2.5em !important;height:40px;line-height:40px;'; // applied style for DIV element
							return value;
						},
//					},{	dataIndex:	'temp_valu'      	, width: 150, align : 'left'   , text: Language.get( 'temp_valu'      , '온도'           ), hidden : false,
//						renderer: function(value, meta){
//							meta.style = 'font-size:2.5em !important;height:40px;line-height:40px;'; // applied style for DIV element
//							return value;
//						},
//					},{	dataIndex:	'temp_appr'      	, width: 150, align : 'left'   , text: Language.get( 'temp_appr'      , '온도오차'           ), hidden : false,
//						renderer: function(value, meta){
//							meta.style = 'font-size:2.5em !important;height:40px;line-height:40px;'; // applied style for DIV element
//							return value;
//						},
//					},{	dataIndex:	'rpm_valu'      	, width: 150, align : 'left'   , text: Language.get( 'rpm_valu'      , 'RPM'           ), hidden : false,
//						renderer: function(value, meta){
//							meta.style = 'font-size:2.5em !important;height:40px;line-height:40px;'; // applied style for DIV element
//							return value;
//						},
//					},{	dataIndex:	'rpm_appr'      	, width: 150, align : 'left'   , text: Language.get( 'rpm_appr'      , 'RPM오차'           ), hidden : false,
//						renderer: function(value, meta){
//							meta.style = 'font-size:2.5em !important;height:40px;line-height:40px;'; // applied style for DIV element
//							return value;
//						},
					}
				],
				listeners: {
					selectionchange: function(grid, selectedRecords) {
						var	form   = me.down('form')
						;
						if(selectedRecords[0]){
							form.down('[name=item_name]').setValue(selectedRecords[0].get('item_name'));
							form.down('[name=user_memo]').setValue(selectedRecords[0].get('user_memo'));
						}
					}
				}
			}
		;
		return grid;
	},


	/**
	 * 조회
	 */
	selectAction: function(){
		var me		= this,
			grid	= me.down('grid'),
			store	= grid.getStore()
		;
		var param	= Ext.merge(me.down('form').getValues(),
								{hq_id : _global.hq_id,invc_numb : me.popup.params.invc_numb }
					)
		;

		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params		: {param:JSON.stringify(param)},
			scope		: me,
			callback	: function(records, operation, success) {
				var beforeDvcd = null;
				var endPoint = 0;
				store.each(function(rec){
					if(rec.get('line_seqn')=="1" && rec.get('prog_stat_dvcd')!="3"){
						grid.getSelectionModel().select(rec.get('line_seqn')-1);//변경해야함.
						endPoint = 1;
					}else{
						if(endPoint == 0){
							if(beforeDvcd == 3 && rec.get('prog_stat_dvcd') != 3){
								grid.getSelectionModel().select((rec.get('line_seqn')-1));
								endPoint = 1;
							}else{
								beforeDvcd = rec.get('prog_stat_dvcd');
							}
						}
					}
				})
				endPoint = 0;
			}
		});
	},
	getState:function(){
		var me = this,
			grid	= me.down('grid'),
			store	= grid.getStore()
		;

		var dvcd = "";
		if(_global.login_pk=="RE122"){
			dvcd = "2";
		}else if( _global.login_pk=="RE63"){
			dvcd = "3";
		}
		if(dvcd != ""){
			Ext.Ajax.request({
				url			: _global.api_host_info + '/' + _global.app_site + '/custom/komec/prod/workbook/get/cvicState.do',
				method		: "POST",
				params		: {
					token	: _global.token_id,
					param	: Ext.encode({
						dvcd	: dvcd,
					})
				},
				success : function(response, request) {
					var object = response,
						result = Ext.decode(object.responseText)
					;
					if(result.records.length>0){
						me.down('[name=temp]').setValue(result.records[0].param);
						me.down('[name=rpm]').setValue(result.records[1].param);

						var temp = result.records[0].param;
						var rpm = result.records[1].param;

						for (var i = 0; i < store['data'].length; i++) {
							if(store['data'].items[i].get('prog_stat_dvcd') =='1'){
								var temp_valu = store['data'].items[i].get('temp_valu');
								var rpm_valu = store['data'].items[i].get('rpm_valu');
								var tmep_appr = store['data'].items[i].get('temp_appr');
								var rpm_appr = store['data'].items[i].get('rpm_appr');

								if(tmep_appr <= Math.abs(temp_valu - temp)){
									var tempField = me.down('[name=temp]');
									tempField.setFieldStyle('backgroundColor: Red;');
								}else{
									var tempField = me.down('[name=temp]');
									tempField.setFieldStyle('backgroundColor: White;');
								}
								if(rpm_appr <= Math.abs(rpm_valu - rpm)){
									var rpmField = me.down('[name=rpm]');
									rpmField.setFieldStyle('backgroundColor: Red;');
								}else{
									var rpmField = me.down('[name=rpm]');
									rpmField.setFieldStyle('backgroundColor: White;');
								}
							}
						}
					}
				},
				failure : function(response, request) {
					resource.httpError(response);
				},
				callback : function() {
				}
			});
		}
	}
});
