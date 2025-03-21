
Ext.define('module.workshop.print.basic.menumast.view.MenuMastFilePopup', { extend: 'Axt.popup.Upload',

	alias: 'widget.module-workshop-menu-filepopup',
	store	: 'module.workshop.print.basic.menumast.store.MenuMastFilePopup',

	title: '메인이미지',
	closable: true,
	autoShow: true,
	width	: 700,
	height	: 500,
	layout: {
		type: 'border'
	},

	defaultFocus : 'initfocused',

	/**
	* component 초기화
	*/
	initComponent: function(config){
		var me = this
		;
		me.items = [me.createForm()];
		me.callParent(arguments);
		me.selectAction();
	},

	createForm: function(){
		var me = this,
			form = {
				xtype		: 'form-layout' ,
				region		: 'center',
				border		: false,
				dockedItems	: [ me.searchForm() ],
				items		: [ me.createGrid() ]  //me.createToolbar(),
			};
		return form;
	},

	searchForm: function(){
		var me = this,
			form = {
			xtype		: 'form-search',
			bodyStyle	: { padding: '0', background: 'transparent' },
			dockedItems	: [
				{	xtype	: 'toolbar',
					dock	: 'top',
					items	: [
						{	xtype	: 'container',
							border	: 0,
							style	: { borderColor	: '#8C8C8C', borderStyle	: 'solid' },
							region	: 'center',
							flex	: 1,
							height	: 40,
							margin	: '0 5 0 1',
							items	: [
								{	xtype	: 'fieldset',
									border	: 3,
									flex	: 1,
									style	: { borderColor	: '#263c63', borderStyle	: 'solid' },
									region	: 'center',
									height	: 34,
									margin	: '3 0 0 0',
									layout	: 'hbox',
									items	: [
										{	xtype	: 'label',
											text	: 'SEARCH  | ',
											margin	: '7 10 0 0',
											style	: 'text-align:center;color: #263c63;font-size: 13px !important;font-weight:bold;',
										},{	name	: 'find_name',
											xtype	: 'searchfield',
											margin	: '3 10 0 0',
											flex	: 1,
											enableKeyEvents : true,
											value	: me.popup.params.find,
											listeners:{
												keydown : function(self, e) {
													if (e.keyCode == e.ENTER || e.keyCode == 9) {
														var searchButton = self.up('form').down('[action=selectAction]'); /* 조회버튼 위치 */
														searchButton.fireEvent('click', searchButton);					 /* 조회버튼 Click */
													}
												},
											}
										}
									]
								},
							]
						},
						{	xtype	: 'button',
							scope	: me,
							handler	: me.selectAction,
							width	: 40,
							height	: 36,
							region	: 'north',
							margin	: '2 2 0 0',
							action	: Const.SELECT.action ,
							style	: 'background:url("../../../resource/img/btn_search_icon.png")'
						}
					]
				},{
					xtype : 'container'  , layout: 'border', border : 0 , height: 3  // 하단 items 구현시 dockitems 와 items 사이가 붙어있어 공간을 주기 위해서
				}
			],
			layout			: { type: 'vbox' },
			fieldDefaults	: { height : 22, width : 260, labelWidth : 60, labelSeparator : '' },
			items			: [
				// 기타 검색 조건이 필요한 경우
			]
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
				viewConfig	: {
					loadMask: new Ext.LoadMask( me , { msg: Const.SELECT.mask  } )
				},
				selModel	: {	selType: 'checkboxmodel', mode : (me.popup.select == 'MULTI')?'MULTI':'SINGLE'  },
				store		: Ext.create(me.store),
				paging		: {
					xtype	: 'grid-paging',
					items	: [
						'->' ,
						{xtype: 'button' , text : '<span class="write-button">업로드</span>', scope: me, handler: me.uploadAction, cls: 'button-style'},
						,{	text: Const.DELETE.text ,
							iconCls: Const.DELETE.icon,
							cls: 'button-style',
							handler:function(){
								var grid = me.down('grid');
								var params = grid.getSelectionModel().getSelection()[0];
								var store = grid.getStore();
								if(!params){
									Ext.Msg.error("삭제할 파일을 선택해주세요." );
								}else{
									Ext.Msg.confirm("확인", "삭제하시겠습니까?", function(button) {
										if (button == 'yes') {
											var mask = new Ext.LoadMask(Ext.getBody(), { msg : Const.DELETE.mask });
											mask.show();
											Ext.Ajax.request({
												url		: _global.location.http() + '/upload/get/fileDelete.do',
												params	: {
													token : _global.token_id,
													param : JSON.stringify({
														stor_id			: _global.stor_id,
														hqof_idcd		: _global.hqof_idcd,
														file_name		: params.data.file_name,
														orgn_dvcd		: "main",
														invc_numb		: params.data.invc_numb,
														line_seqn		: params.data.line_seqn,
														assi_seqn		: params.data.assi_seqn
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
														store.reload();
													}
												},
												failure : function(result, request) {
													Ext.Msg.error(result.mesage);
												},
												callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
													mask.hide();
												}
											});
										}
									});
								}
							}
						},'-',
						{xtype: 'button' , text : Const.CLOSER.text, iconCls: Const.CLOSER.icon , scope: me, handler: me.close       , cls: 'button-style'}
					]
				},
				columns: [
					{	dataIndex: 'line_seqn'		, text : Language.get('line_seqn'		,'순번'	)		, width : 80 , align : 'center',hidden:true
					},{	dataIndex: 'assi_seqn'		, text : Language.get('assi_seqn'		,'순번'	)		, width : 80 , align : 'center'
					},{ dataIndex: 'file_ttle'		, text : Language.get('file_ttle'		,'파일명')		, width : 120 ,hidden:true
					},{ dataIndex: 'file_name'		, text : Language.get('file_name'		,'파일명')		, flex : 1 ,
						renderer:function(val,meta,record){
							var title = val;
							if(record.get('file_ttle')!='' && record.get('file_ttle')!=undefined){
								title = record.get('file_ttle');
							}
							return '<a>'+title+'</a>'
						},
						listeners:{
							click : function(view,el,pos){
								var record = view.getStore().getAt(pos);
								Ext.Ajax.request({
									url		: _global.location.http() + '/upload/set/fileDownload.do',
									params	: {
										token : _global.token_id,
										param : JSON.stringify({
											stor_id			: _global.stor_id,
											hqof_idcd		: _global.hqof_idcd,
											file_name		: record.get('file_name'),
										})
									},
									method	: 'POST',
									async	: false,
									success	: function(response, request) {
										var result = Ext.decode(response.responseText);
										if	(!result.success ){
											Ext.Msg.error(result.message );
											return;
										} else {
											var url = './resource/downloadFile/'+record.get('file_name');
											window.open(url,'down','width=1400,height=800');
										}
									},
									failure : function(result, request) {
										Ext.Msg.error(result.mesage);
									},
									callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
									}
								});
								setTimeout(function(){
									Ext.Ajax.request({
										url		: _global.location.http() + '/upload/set/localDelete.do',
										params	: {
											token : _global.token_id,
											param : JSON.stringify({
												stor_id			: _global.stor_id,
												hqof_idcd		: _global.hqof_idcd,
												file_name		: record.get('file_name'),
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
												console.log(result);
											}
										},
										failure : function(result, request) {
											Ext.Msg.error(result.mesage);
										},
										callback: function(operation){  /* 성공 실패 관계 없이 호출된다. */
										}
									})
								},60000);
							}
						}
					},{
						dataIndex: 'file_size'		,
						text : Language.get('file_size'		,'파일크기'),
						width : 100 ,
						renderer: function(value) {
							return Ext.String.format(numberFmt(value)+'kb')
						},
						align : 'center'
					},{ dataIndex: 'upld_dttm'		, text : Language.get('upld_dttm'		,'업로드일시')	, width : 100 , align : 'center'
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고')			, width : 200 ,
					},{ dataIndex: 'invc_numb'		, text : Language.get('invc_numb'		,'invc_numb')	, width : 200 , hidden:true
					}
				],
			}
		;
		function numberFmt(value) {							//파일크기 number format해주는 함수
			return Ext.util.Format.number(value,'0,000');
		}
		return grid;
	},


	/**
	 * 조회
	 */
	selectAction: function(){
		var me		= this,
		store	= me.down('grid').getStore(),
		param	= Ext.merge(me.down('form').getValues(),
				{hq_id : _global.hq_id },
				me.popup.params
		)
		;
		if (me.popup.apiurl && me.popup.apiurl.search ) {
			store.getProxy().api.read = me.popup.apiurl.search ;
		}
		store.load({
			params		: {param:JSON.stringify(param)},
			scope		: me,
			callback	: function(records, operation, success) {
			}
		});
	},
	/**
	 * upload
	 */
	uploadAction: function(){
		var	me		= this,
			store	= me.down('grid').getStore()
		;
		resource.loadPopup({
			select	: 'SINGLE',
			widget	: 'lookup-board-upload',
			params : { stor_grp : _global.stor_grp , invc_numb : 'main',line_seqn:0, orgn_dvcd : 'main'},
			result	: function(records) {
				store.reload();
			},
		})
	},
});
