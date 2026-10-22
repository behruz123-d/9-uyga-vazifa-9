import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export type Product = {
    id: string;
    name: string;
    price: number;
}

type Products = Product[]

export function TableDemo({ products }: { products: Products }) {
  return (
    <div className="rounded-lg border bg-card px-2 pb-2">
      <Table>
        <TableCaption>Mahsulotlar ro&apos;yxati</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-16 font-semibold">No</TableHead>
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="text-right font-semibold">Price</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((invoice, index) => (
            <TableRow key={invoice.id}>
              <TableCell className="tabular-nums text-muted-foreground">
                {index + 1}
              </TableCell>
              <TableCell className="font-medium">
                {invoice.name}
              </TableCell>
              <TableCell className="text-right font-semibold tabular-nums">{invoice.price.toLocaleString("en-US")}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="text-right">
              Total products: {products.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
