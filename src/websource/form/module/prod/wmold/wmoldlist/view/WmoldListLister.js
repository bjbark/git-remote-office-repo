Ext.define('module.prod.wmold.wmoldlist.view.WmoldListLister', { extend: 'Axt.grid.Panel',
	alias		: 'widget.module-wmoldlist-lister'			,
	selModel	: { selType: 'checkboxmodel', mode : 'SINGLE' },
	store		: 'module.prod.wmold.wmoldlist.store.WmoldList',
	border		: 0,
	columnLines : true,
	features	: [{ ftype : 'grid-summary' , remote : true } ],
	plugins		: [{ ptype : 'gridcolumnmenu' },{ ptype: 'gridcolumnconfig'}],
	viewConfig	: { markDirty: false , loadMask : false, enableTextSelection: true },
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
					'->', '-' ,
					{text : Const.EXPORT.text, iconCls: Const.EXPORT.icon, action : Const.EXPORT.action, cls: 'button-style' } ,
				]
			};
		return item ;
	},


	columnItem : function () {
		var me = this,
			item = {
				defaults: {style: 'text-align: center'},
				items : [
					{ dataIndex: 'mold_code'		, text : Language.get('acpt_numb'		,'목형코드'			) , width :  90 , align : 'center'
					},{ dataIndex: 'mold_name'		, text : Language.get('acpt_case_name'	,'목형명'			) , width : 170 , align : 'left'
					},{ dataIndex: 'stor_plac'		, text : Language.get('stor_plac'		,'위치'			) , width : 80  , align : 'left'
					},{ dataIndex: 'mngt_dept_name'	, text : Language.get('mngt_dept_name'	,'관리부서'			) , width :  80 , align : 'left',
					},{ dataIndex: 'owne_riht'		, text : Language.get('owne_riht'		,'소유권'			) , width : 100 , align : 'left'
					},{ dataIndex: 'egrv_numb'		, text : Language.get('egrv_numb'		,'각인번호'			) , width : 80  , align : 'center'
					},{ dataIndex: 'cavity'			, text : Language.get('cavity'			,'CAVITY'		) , width : 70  , align : 'center'
					},{ dataIndex: 'make_cmpy_name'	, text : Language.get('make_cmpy_name'	,'제작처'			) , width : 80  , align : 'left'
					},{ dataIndex: 'make_date'		, text : Language.get('make_date'		,'제작일'			) , width : 80  , align : 'center'
					},{ dataIndex: 'rcpt_cmpy_name'	, text : Language.get('rcpt_cmpy_name'	,'전인수업체'		) , width : 100 , align : 'left',
					},{ dataIndex: 'updt_expc_date'	, text : Language.get('updt_expc_date'	,'수정예상일'		) , width : 100 , align : 'left',
					},{ dataIndex: 'puch_date'		, text : Language.get('puch_date'		,'구매일자'			) , width : 100 , align : 'left',
					},{ dataIndex: 'dsse_date'		, text : Language.get('dsse_date'		,'폐기일자'			) , width : 100 , align : 'left',
					},{ dataIndex: 'norm_yorn'		, text : Language.get('norm_yorn'		,'양산여부'			) , width : 60  , xtype : 'lookupcolumn', lookupValue : resource.lookup('yorn'), align : 'center'
					},{ dataIndex: 'mold_spec'		, text : Language.get('mold_spec'		,'목형규격'			) , width : 130 , align : 'left',
					},{ dataIndex: 'mtrl_name'		, text : Language.get('mtrl_name'		,'재질'			) , width : 100 ,align : 'center'
					},{ dataIndex: 'mold_grad_name'	, text : Language.get('mold_grad_name'	,'GRADE'		) , width : 100 , align : 'center'
					},{ dataIndex: 'runr_wigt'		, text : Language.get('runr_wigt'		,'런너중량'			) , width : 80  , align : 'right' , xtype : 'numericcolumn'
					},{ dataIndex: 'prod_wigt'		, text : Language.get('prd_wigt'		,'제품중량'			) , width : 80  , align : 'right' , xtype : 'numericcolumn'
					},{ dataIndex: 'resultshot'		, text : Language.get(''				,'잔여shot'		) , width : 70  , align : 'right',
					},{ dataIndex: 'cycl_time'		, text : Language.get('cycl_time'		,'C/T(sec)'		) , width : 70  , align : 'right' , xtype : 'numericcolumn'
					},{ dataIndex: 'remk_text'		, text : Language.get('remk_text'		,'비고'			) , width : 150 , align : 'left',
					},{ dataIndex: 'cstm_name'		, text : Language.get('cstm_name'		,'고객사'			) , width : 80 , align : 'left',
					},{ dataIndex: 'user_memo'		, text : Language.get('user_memo'		,'목형상태'			) , width : 150 , align : 'left',
					}
				]
			}
		;
		function numberFmt(value) {							//파일크기 number format해주는 함수
			return Ext.util.Format.number(value,'0,000');
		}
		return item;
	}
});