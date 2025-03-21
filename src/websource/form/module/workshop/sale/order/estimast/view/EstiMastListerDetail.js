Ext.define('module.workshop.sale.order.estimast.view.EstiMastListerDetail', { extend: 'Axt.grid.Panel',

	alias: 'widget.module-estimast-lister-detail',

	store: 'module.workshop.sale.order.estimast.store.EstiMastDetail',

	border		: 0 ,
	columnLines	: true ,
	features	: [{ ftype : 'grid-summary' }],
	plugins		: [{ ptype:'gridcolumnmenu' } , { ptype:'gridcolumnconfig' }
				, {ptype  :'cellediting-directinput', clicksToEdit: 1 }],

	/**
	 *
	 */
	initComponent : function() {
		var me = this;
		me.paging  = me.pagingItem();
		me.columns = me.columnItem();
		me.callParent();
	},

	/**
	 *
	 */
	pagingItem : function() {
		var me = this,
			item = {
				xtype : 'grid-paging',
				items : [
					'->', '-',
					{	text : '<span class="write-button">작업지시서</span>', action : 'printAction'	 , cls: 'button1-style', itemId:'detailPrint'} ,

					{ text : Const.EXPORT.text, iconCls : Const.EXPORT.icon, action : Const.EXPORT.action ,cls: 'button-style', itemId : 'detail' }
				],
				pagingButton : false
			}
		;
		return item;
	},

	/**
	 *
	 */
	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align:center'},
				items : [
					{	dataIndex:	'drwg_numb'		, text: Language.get('drwg_numb'		, '도번'			), width: 120 , align : 'left',
					},{	dataIndex:	'revs_numb'		, text: Language.get('revs_numb'		, 'Rev'			), width:  50 , align : 'left',
					},{	dataIndex:	'item_name'		, text: Language.get('item_name'		, '품명'			), width: 200 , align : 'left', summaryType: 'count',
					},{	dataIndex:	'invc_qntt'		, text: Language.get('invc_qntt'		, '품목수주량'	), width: 75  , xtype: 'numericcolumn', summaryType: 'sum', hidden : true,
					},{	dataIndex:	'item_leng'		, text: Language.get('item_leng'		, '제품길이'		), width: 70  , xtype: 'numericcolumn',
					},{	dataIndex:	'item_widh'		, text: Language.get('item_widh'		, '제품넓이'		), width: 70  , xtype: 'numericcolumn',
					},{	dataIndex:	'mtrl_name'		, text: Language.get('mtrl_name'		, '적용원자재'	), width: 200 , hidden : true,
					},{	dataIndex:	'mtrl_spec'		, text: Language.get('mtrl_spec'		, '원자재규격'	), width: 200 , hidden : true,
					},{	dataIndex:	'acpt_qntt'		, text: Language.get('acpt_qntt'		, '제품수량/장당'	), width:  90 , xtype: 'numericcolumn' , summaryType: 'sum', hidden : true,
					},{	dataIndex:	'mprq_qntt'		, text: Language.get('mprq_qntt'		, '원자재소요량'	), width:  85 , xtype: 'numericcolumn' , summaryType: 'sum', hidden : true,
					},{	dataIndex:	'bcod_numb'		, text: Language.get('bcod_numb'		, '바코드 번호'	), width: 200 , align: 'center',
						tdCls	: 'editingcolumn',
						editor		: {
							xtype		:'textfield',
							readOnly	: true,
							margin		: '0 0 0 0',
						},
					},{ header: '생산계획',
						sortable: false,
						width:70,
						align : 'center',
						renderer: function(val,meta,rec) {
							meta.style = 'width : 70; align : center;';
							var id = Ext.id();
							if(rec.data.acct_bacd != '3000'){
								if(rec.data.pror_cnt > 0){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span style="color : white !important;">계획등록</span>',
											width	: 60,
											height	: 19,
											cls		: 'button-style',
											style	: 'background : #419641',
											handler	: function(b){me.plan(rec)}
										});
									}, 50);
								}else{
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span style="color : white !important;">계획등록</span>',
											width	: 60,
											height	: 19,
											cls		: 'button-style',
											handler	: function(b){me.plan(rec)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}
						},
						dataIndex: 'somefieldofyourstore'
					},{ header: '원자재등록',
						sortable: false,
						width:75,
						align : 'center',
						renderer: function(val,meta,rec) {
							meta.style = 'width : 70; align : center;';
							var id = Ext.id();
							if(rec.data.acct_bacd != '3000'){
								if(rec.data.mtrl_cnt1 > 0){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span style="color : white !important;">원자재등록</span>',
											width	: 63,
											height	: 19,
											style	: 'background : #419641',
											cls		: 'button-style',
											handler	: function(b){me.mainItem(rec)}
										});
									}, 50);
								}else{
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span style="color : white !important;">원자재등록</span>',
											width	: 63,
											height	: 19,
											cls		: 'button-style',
											handler	: function(b){me.mainItem(rec)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}
						},
						dataIndex: 'somefieldofyourstore'
					},{ header: '부자재등록',
						sortable: false,
						width:75,
						align : 'center',
						renderer: function(val,meta,rec) {
							meta.style = 'width : 70; align : center;';
							var id = Ext.id();
							if(rec.data.acct_bacd != '3000'){
								if(rec.data.mtrl_cnt2 > 0){
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span style="color : white !important">부자재등록</span>',
											width	: 63,
											height	: 19,
											cls		: 'button-style',
											style	: 'background : #419641',
											handler	: function(){me.subItem(rec)}
										});
									}, 50);
								}else{
									Ext.defer(function() {
										Ext.widget('button', {
											renderTo: Ext.query("#"+id)[0],
											text	: '<span style="color : white !important">부자재등록</span>',
											width	: 63,
											height	: 19,
											cls		: 'button-style',
											handler	: function(){me.subItem(rec)}
										});
									}, 50);
								}
								return Ext.String.format('<div id="{0}"></div>', id);
							}
						},
						dataIndex: 'somefieldofyourstore'
					}
				]
			};
		return item;
	},

	plan : function (rec){
		var me		= this,
			select = Ext.ComponentQuery.query('module-estimast-lister-master')[0].getSelectionModel().getSelection()[0],
			master = Ext.ComponentQuery.query('module-estimast-lister-master')[0],
			editor = Ext.ComponentQuery.query('module-estimast-worker-editor2')[0],
			editor1 = Ext.ComponentQuery.query('module-estimast-worker-editor')[0],
			item1  = Ext.ComponentQuery.query('module-estimast-lister-item1')[0],
			item2  = Ext.ComponentQuery.query('module-estimast-lister-item2')[0],
			layout = Ext.ComponentQuery.query('module-estimast-layout')[0],
			msg = ''
		;
		if(rec){
			if(select.get('acpt_stat_dvcd') !='0011'){
				msg = "승인된 수주건에만 계획을 등록 할 수 있습니다.";
			}
//			if(rec.get('acct_bacd').substr(0,1)=='1'){
//				msg = "계획을 등록 할 수 있는 품목이 아닙니다.";
//			}
			if(msg){
				Ext.Msg.alert('알림',msg);
				return;
			}
			var acpt_qntt;
			editor.selectRecord({ lister : master, record : select }, me);
			editor.selectRecord({ lister : master, record : rec }, me);

			item1.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true); }
				}, scope:me
			}, Ext.merge({
					stor_grp : _global.stor_grp,
					acpt_numb : select.get('invc_numb'),
					acpt_seqn : select.get('line_seqn'),
					acpt_amnd_degr : select.get('amnd_degr'),
					item_idcd  : rec.get('item_idcd')
				})
			);
			item2.select({
				callback:function(records, operation, success) {
					if (success) {
					} else { me.pocket.editor().getForm().reset(true); }
				}, scope:me
			}, Ext.merge({
				stor_grp : _global.stor_grp,
				acpt_numb : select.get('invc_numb'),
				acpt_seqn : select.get('line_seqn'),
				acpt_amnd_degr : select.get('amnd_degr'),
				item_idcd  : rec.get('item_idcd')
			})
			);
			layout.getLayout().setActiveItem(2);
			window.tabActive = 0;
		}
	},

	mainItem:function(rec){
		var	me = this,
			layout = Ext.ComponentQuery.query('module-estimast-layout')[0],
			editor = Ext.ComponentQuery.query('module-estimast-worker-editor3')[0],
			master = Ext.ComponentQuery.query('module-estimast-lister-master')[0],
			select = master.getSelectionModel().getSelection()[0],
			lister = Ext.ComponentQuery.query('module-estimast-lister-mainItem')[0]

		;
		editor.selectRecord({ record : select }, me);
		editor.selectRecord({ record : rec }, me);
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { }
			}, scope:me
		}, Ext.merge({invc_numb:rec.get("invc_numb"),prnt_idcd:rec.get('item_idcd')}, { stor_grp : _global.stor_grp }));

		layout.getLayout().setActiveItem(4);
		window.tabActive = 0;
	},
	subItem:function(rec){
		var	me = this,
			layout = layout = Ext.ComponentQuery.query('module-estimast-layout')[0],
			editor = Ext.ComponentQuery.query('module-estimast-worker-editor4')[0],
			master = Ext.ComponentQuery.query('module-estimast-lister-master')[0],
			select = master.getSelectionModel().getSelection()[0],
			lister = Ext.ComponentQuery.query('module-estimast-lister-subItem')[0]
		;
		editor.selectRecord({ record : select }, me);
		editor.selectRecord({ record : rec }, me);
		lister.select({
			callback:function(records, operation, success) {
				if (success) {
				} else { }
			}, scope:me
		}, Ext.merge({invc_numb:select.get("invc_numb"),prnt_idcd:rec.get('item_idcd')}, { stor_grp : _global.stor_grp }));

		layout.getLayout().setActiveItem(3);
		window.tabActive = 0;
	}
});
