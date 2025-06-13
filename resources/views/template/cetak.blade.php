

<!DOCTYPE html>
<html>
	<head>	
        @include('template.css')
        <title>Cetak Jadwal - <?= $title;?></title>
		<style>
            
            .login-form-title img {
            width: 20%;
            margin-top: auto;
            margin-bottom: auto;
            }
            .print-content{
            margin-top: auto;
            margin-bottom: auto;
            margin-left:5rem;
            }
            .hr1{
                margin-left:auto;
                margin-top:0;
                margin-bottom:0;
                margin-right:auto;
                border: 2px solid black;
                width: 100%;
            }
            .hr2{
                margin-left:auto;
                margin-top:5px;
                margin-right:auto;
                border: 1px solid black;
                width: 100%;
            }
            .login-form-title {
            margin-left: 1%;
            margin-right: 5%;
            }
			body {
				background: rgba(0,0,0,0.2);
			}
			page[size="A4"] {
				background: white;
				height: auto;
				width: 29.7cm;
				display: block;
				margin: 0 auto;
				margin-bottom: 0.5pc;
				box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
				padding-left:2.54cm;
				padding-right:2.54cm;
				padding-top:1.54cm;
				padding-bottom:1.54cm;
			}
			@media print {
				body, page[size="A4"] {
					margin: 0;
					box-shadow: 0;
				}
			}
		</style>
	</head>
	<body>
        <div class="container">
            <br/> 
            <div class="float-right"> 
                <button type="button" class="btn btn-success btn-md" onclick="printDiv('printableArea')">
                    <i class="fa fa-print"> </i> Print File
                </button>
            </div>
            <div class="float-left">
                @yield('title') - Preview HTML to PDF [ size paper A4 ]
            </div>
        </div>
        <br/>
        <div id="printableArea" class="mt-lg-7">
            <page size="A4">
                @yield('content')
            </page>
        </div>
  </body>
  
  @include('template.js')
  <script>
    function printDiv(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    }
  </script>
</html>