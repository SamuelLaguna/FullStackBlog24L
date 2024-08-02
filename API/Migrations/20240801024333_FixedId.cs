using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class FixedId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "UserInfo",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "BlogInfo",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "UserInfo",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "BlogInfo",
                newName: "id");
        }
    }
}
